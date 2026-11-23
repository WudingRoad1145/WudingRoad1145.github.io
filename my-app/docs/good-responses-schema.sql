-- Proposed setup for a NEW, isolated portfolio Supabase project.
-- Not applied to any cloud database. No browser role can access this table.
begin;
create table public.portfolio_good_responses (
  visitor_id uuid primary key,
  answer text not null check (char_length(btrim(answer)) between 1 and 160),
  created_at timestamptz not null default now()
);
create index portfolio_good_responses_recent_idx
  on public.portfolio_good_responses (created_at desc, visitor_id desc);
alter table public.portfolio_good_responses enable row level security;
revoke all on public.portfolio_good_responses from public, anon, authenticated;
grant select, insert, update on public.portfolio_good_responses to service_role;
commit;
