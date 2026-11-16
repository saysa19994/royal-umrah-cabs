-- Staging only: review with owner before applying to any database.
-- Durable deduplication so repeated signed Meta webhooks are not answered twice.
create table if not exists public.whatsapp_webhook_events (
  message_id text primary key,
  delivery_state text not null default 'processing'
    check (delivery_state in ('processing', 'sent', 'failed')),
  received_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.whatsapp_webhook_events enable row level security;
revoke all on public.whatsapp_webhook_events from anon, authenticated;
-- No public RLS policies; service-role server access only.
