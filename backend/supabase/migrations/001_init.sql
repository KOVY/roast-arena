-- Initial schema for RoastArena

create extension if not exists pgcrypto;

-- users
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  email text,
  name text,
  created_at timestamptz default now()
);

-- roasts
create table if not exists roasts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references users(id) on delete set null,
  text text not null,
  created_at timestamptz default now(),
  likes int default 0
);

-- pizzerias
create table if not exists pizzerias (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  created_at timestamptz default now()
);

-- challenges
create table if not exists challenges (
  id uuid default gen_random_uuid() primary key,
  pizzeria_id uuid references pizzerias(id) on delete cascade,
  title text,
  reward text,
  created_at timestamptz default now()
);

-- gifts / monetization
create table if not exists gifts (
  id uuid default gen_random_uuid() primary key,
  from_user uuid references users(id),
  to_user uuid references users(id),
  amount numeric(10,2),
  currency text,
  created_at timestamptz default now()
);

-- transactions
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  type text,
  amount numeric(10,2),
  currency text,
  meta jsonb,
  created_at timestamptz default now()
);
