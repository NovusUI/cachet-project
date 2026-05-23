create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  site_key text not null,
  form_key text not null,
  first_name text not null,
  last_name text,
  phone text not null,
  email text not null,
  service text not null,
  message text not null,
  source_url text,
  origin text,
  user_agent text,
  status text not null default 'received'
);

alter table public.contact_submissions enable row level security;
