-- Projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'planning' check (status in ('planning', 'active', 'paused', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tasks table
create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  assigned_to text not null check (assigned_to in ('leon', 'jill', 'chris', 'barry', 'albert')),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  created_at timestamptz not null default now()
);

-- Activity logs table
create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  agent text not null,
  model text not null,
  action text not null,
  timestamp timestamptz not null default now()
);

-- Enable Row Level Security
alter table projects enable row level security;
alter table tasks enable row level security;
alter table activity_logs enable row level security;

-- Read-only policy for anon (dashboard)
create policy "anon read projects" on projects for select using (true);
create policy "anon read tasks" on tasks for select using (true);
create policy "anon read activity_logs" on activity_logs for select using (true);

-- Full access for service role (agents)
create policy "service all projects" on projects for all using (true);
create policy "service all tasks" on tasks for all using (true);
create policy "service all activity_logs" on activity_logs for all using (true);

-- Seed agent-hub as the first project
insert into projects (name, status) values ('agent-hub', 'active');
