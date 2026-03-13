-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  assigned_to TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activity logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent TEXT NOT NULL,
  model TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Read-only policy for anon (dashboard)
CREATE POLICY "anon read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "anon read tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "anon read activity_logs" ON activity_logs FOR SELECT USING (true);

-- Full access for service role (agents)
CREATE POLICY "service all projects" ON projects FOR ALL USING (true);
CREATE POLICY "service all tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "service all activity_logs" ON activity_logs FOR ALL USING (true);

-- Seed agent-hub as the first project
INSERT INTO projects (name, status) VALUES ('agent-hub', 'active');
