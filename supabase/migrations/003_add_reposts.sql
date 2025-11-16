-- Add reposts table for X/Twitter-style reposting functionality
create table if not exists reposts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade not null,
  roast_id uuid references roasts(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, roast_id)
);

-- Add index for better query performance
create index if not exists idx_reposts_user_id on reposts(user_id);
create index if not exists idx_reposts_roast_id on reposts(roast_id);
create index if not exists idx_reposts_created_at on reposts(created_at desc);

-- Add follows table for user following functionality
create table if not exists follows (
  id uuid default gen_random_uuid() primary key,
  follower_id uuid references users(id) on delete cascade not null,
  following_id uuid references users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(follower_id, following_id),
  check (follower_id != following_id)
);

-- Add index for follows
create index if not exists idx_follows_follower_id on follows(follower_id);
create index if not exists idx_follows_following_id on follows(following_id);

-- Add bookmarks table
create table if not exists bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade not null,
  roast_id uuid references roasts(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, roast_id)
);

-- Add index for bookmarks
create index if not exists idx_bookmarks_user_id on bookmarks(user_id);
create index if not exists idx_bookmarks_roast_id on bookmarks(roast_id);

-- Add reports table
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  reporter_id uuid references users(id) on delete set null,
  roast_id uuid references roasts(id) on delete cascade not null,
  reason text not null,
  status text default 'pending' check (status in ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add index for reports
create index if not exists idx_reports_roast_id on reports(roast_id);
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_reports_created_at on reports(created_at desc);

-- Enable Row Level Security (RLS)
alter table reposts enable row level security;
alter table follows enable row level security;
alter table bookmarks enable row level security;
alter table reports enable row level security;

-- RLS Policies for reposts
create policy "Users can view all reposts"
  on reposts for select
  using (true);

create policy "Users can create their own reposts"
  on reposts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own reposts"
  on reposts for delete
  using (auth.uid() = user_id);

-- RLS Policies for follows
create policy "Users can view all follows"
  on follows for select
  using (true);

create policy "Users can create their own follows"
  on follows for insert
  with check (auth.uid() = follower_id);

create policy "Users can delete their own follows"
  on follows for delete
  using (auth.uid() = follower_id);

-- RLS Policies for bookmarks
create policy "Users can view their own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookmarks"
  on bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);

-- RLS Policies for reports
create policy "Admins can view all reports"
  on reports for select
  using (true); -- TODO: Add admin role check

create policy "Users can create reports"
  on reports for insert
  with check (auth.uid() = reporter_id);

create policy "Users can view their own reports"
  on reports for select
  using (auth.uid() = reporter_id);
