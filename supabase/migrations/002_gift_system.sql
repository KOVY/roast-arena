-- Gift System Migration
-- Adds gift types, revenue splits, and payout eligibility tracking

-- Gift Types table (6 hejtovských legrací)
create table if not exists gift_types (
  id uuid default gen_random_uuid() primary key,
  name_key text not null unique, -- i18n key like "gifts.boxerky"
  emoji text not null,
  price_czk numeric(10,2) not null,
  price_eur numeric(10,2) not null,
  price_usd numeric(10,2) not null,
  price_pln numeric(10,2) not null,
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Insert default gift types
insert into gift_types (name_key, emoji, price_czk, price_eur, price_usd, price_pln, display_order) values
  ('gifts.boxerky', '🩲', 10.00, 0.40, 0.45, 1.80, 1),
  ('gifts.ponozky', '🧦', 25.00, 1.00, 1.10, 4.50, 2),
  ('gifts.pivo', '🍺', 50.00, 2.00, 2.20, 9.00, 3),
  ('gifts.trofej', '🏆', 100.00, 4.00, 4.40, 18.00, 4),
  ('gifts.koruna', '👑', 250.00, 10.00, 11.00, 45.00, 5),
  ('gifts.diamant', '💎', 500.00, 20.00, 22.00, 90.00, 6);

-- Update existing gifts table to reference gift_types
alter table gifts add column if not exists gift_type_id uuid references gift_types(id);
alter table gifts add column if not exists roast_id uuid references roasts(id) on delete cascade;
alter table gifts add column if not exists author_share numeric(10,2) default 0;
alter table gifts add column if not exists platform_share numeric(10,2) default 0;

-- Add user earnings tracking
alter table users add column if not exists username text;
alter table users add column if not exists avatar_url text;
alter table users add column if not exists total_earnings numeric(10,2) default 0;
alter table users add column if not exists total_sent numeric(10,2) default 0;
alter table users add column if not exists gifts_sent_count int default 0;
alter table users add column if not exists gifts_received_count int default 0;
alter table users add column if not exists payout_eligible boolean default false;

-- Add roast content field if missing
alter table roasts add column if not exists content text;
-- Migrate existing 'text' to 'content' for consistency (use quoted identifier)
update roasts set content = roasts."text" where content is null;

-- Function to check payout eligibility (must send 3+ gifts)
create or replace function check_payout_eligibility(user_uuid uuid)
returns boolean as $$
begin
  return (
    select count(*) >= 3
    from gifts
    where from_user = user_uuid
  );
end;
$$ language plpgsql;

-- Function to process gift transaction with 60/40 split
create or replace function send_gift(
  p_from_user uuid,
  p_to_user uuid,
  p_roast_id uuid,
  p_gift_type_id uuid,
  p_amount numeric,
  p_currency text
)
returns json as $$
declare
  v_author_share numeric;
  v_platform_share numeric;
  v_gift_id uuid;
begin
  -- Calculate 60/40 split
  v_author_share := p_amount * 0.60;
  v_platform_share := p_amount * 0.40;

  -- Insert gift record
  insert into gifts (from_user, to_user, roast_id, gift_type_id, amount, currency, author_share, platform_share)
  values (p_from_user, p_to_user, p_roast_id, p_gift_type_id, p_amount, p_currency, v_author_share, v_platform_share)
  returning id into v_gift_id;

  -- Update sender stats
  update users
  set total_sent = total_sent + p_amount,
      gifts_sent_count = gifts_sent_count + 1,
      payout_eligible = check_payout_eligibility(p_from_user)
  where id = p_from_user;

  -- Update receiver stats (60% of gift)
  update users
  set total_earnings = total_earnings + v_author_share,
      gifts_received_count = gifts_received_count + 1
  where id = p_to_user;

  -- Record transaction for sender (debit)
  insert into transactions (user_id, type, amount, currency, meta)
  values (
    p_from_user,
    'gift_sent',
    -p_amount,
    p_currency,
    json_build_object(
      'gift_id', v_gift_id,
      'to_user', p_to_user,
      'roast_id', p_roast_id
    )
  );

  -- Record transaction for receiver (credit - author share only)
  insert into transactions (user_id, type, amount, currency, meta)
  values (
    p_to_user,
    'gift_received',
    v_author_share,
    p_currency,
    json_build_object(
      'gift_id', v_gift_id,
      'from_user', p_from_user,
      'roast_id', p_roast_id,
      'split', json_build_object('author', v_author_share, 'platform', v_platform_share)
    )
  );

  -- Return result
  return json_build_object(
    'success', true,
    'gift_id', v_gift_id,
    'author_share', v_author_share,
    'platform_share', v_platform_share,
    'payout_eligible', check_payout_eligibility(p_from_user)
  );
end;
$$ language plpgsql;

-- Create index for performance
create index if not exists idx_gifts_from_user on gifts(from_user);
create index if not exists idx_gifts_to_user on gifts(to_user);
create index if not exists idx_gifts_roast_id on gifts(roast_id);
create index if not exists idx_transactions_user_id on transactions(user_id);

-- RLS policies for gifts
alter table gift_types enable row level security;
alter table gifts enable row level security;

-- Anyone can view gift types
create policy "Gift types are publicly readable"
  on gift_types for select
  using (true);

-- Users can view gifts they sent or received
create policy "Users can view their own gifts"
  on gifts for select
  using (auth.uid() = from_user or auth.uid() = to_user);

-- Users can insert gifts (sending)
create policy "Users can send gifts"
  on gifts for insert
  with check (auth.uid() = from_user);
