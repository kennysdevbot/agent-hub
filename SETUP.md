# Supabase Setup Guide

Get the database running in 7 easy steps.

## Steps

1. **Create Supabase account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (GitHub or email)

2. **Create a new project**
   - Click "New Project"
   - Choose any name (e.g., "agent-hub")
   - Pick a region close to you
   - Set a strong DB password
   - Wait for it to provision (~2 min)

3. **Run the migration**
   - In the Supabase dashboard, go to **SQL Editor**
   - Open a new query
   - Copy the entire contents of `supabase/migration.sql`
   - Paste it into the editor
   - Click **Run** (blue button)
   - Wait for success message

4. **Get your credentials**
   - Go to **Project Settings** (bottom left)
   - Click **API** tab
   - Copy:
     - **Project URL** (looks like `https://xxxxx.supabase.co`)
     - **Anon Public key** (under "Project API keys")

5. **Set up environment**
   - In the repo root, copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```

6. **Fill in credentials**
   - Open `.env`
   - Paste your Project URL into `VITE_SUPABASE_URL`
   - Paste your Anon key into `VITE_SUPABASE_ANON_KEY`

7. **Done**
   - Save `.env`
   - You're ready to run the app!

## Verify It Works

```bash
npm install
npm run dev
```

Go to `http://localhost:5173`. You should see:
- Projects page with "agent-hub" project
- Tasks (empty initially)
- Activity logs (empty initially)

## Troubleshooting

- **"Table already exists"** → The migration ran twice. Delete the old project, make a new one, start over.
- **".env not found"** → You skipped step 5. Create it.
- **No data showing** → Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct (no extra spaces).
