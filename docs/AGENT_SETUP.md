# Agent Setup Guide

This guide covers one-time setup for agents to log their work to Agent Hub.

## Prerequisites

- Node.js installed (already available in OpenClaw environment)
- Access to the `agent-hub` repository
- Supabase service role key

## 1. Get Supabase Service Role Key

Agents need write access to the `activity_logs` table. This requires the **service role key**, not the anon key.

### Where to Find It

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select the Agent Hub project
3. Navigate to **Settings** → **API**
4. Under **Project API keys**, find **service_role** key
5. Copy the key (starts with `eyJ...`)

⚠️ **Security:** Service role bypasses RLS policies. Keep this key secure. Only store it in agent workspace `.env` files, never commit it to git.

## 2. Add to Environment

Edit `/data/.openclaw/workspace/repos/agent-hub/.env`:

```bash
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...  # Already present
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Add this line
```

The `.gitignore` already excludes `.env`, so this won't be committed.

## 3. Test the Logger

Run the test script to verify everything works:

```bash
cd /data/.openclaw/workspace/repos/agent-hub/scripts
./test-logger.sh
```

Or test manually:

```bash
cd /data/.openclaw/workspace/repos/agent-hub
node scripts/agent-hub-logger.js \
  --agent jill \
  --model sonnet-4.5 \
  --action "Test: Verifying logging infrastructure"
```

## 4. Verify in Dashboard

1. Visit the deployed Agent Hub: https://[your-username].github.io/agent-hub
2. Navigate to **Activity Log** tab
3. Confirm your test entry appears with correct timestamp and details

## 5. Agent Workspace Setup

Each agent workspace already has a `LOGGING.md` file with examples:

- `/data/.openclaw/workspace-leon/LOGGING.md`
- `/data/.openclaw/workspace-jill/LOGGING.md`
- `/data/.openclaw/workspace-chris/LOGGING.md`
- `/data/.openclaw/workspace-barry/LOGGING.md`

Agents should read their respective `LOGGING.md` file to learn when and how to log.

## Troubleshooting

### Error: Missing environment variables

```
❌ Missing required environment variables:
   - VITE_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
```

**Fix:** Add `SUPABASE_SERVICE_ROLE_KEY` to `.env` file (see step 2).

### Error: Failed to log

```
❌ Failed to log: [error message]
```

**Possible causes:**
- Service role key is incorrect or expired
- `activity_logs` table doesn't exist (run `create-tables.sql`)
- Network/connectivity issues with Supabase

**Debug:**
```bash
# Check table exists
psql [connection-string] -c "\dt activity_logs"

# Verify env vars are loaded
cd /data/.openclaw/workspace/repos/agent-hub
node -e "console.log(process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Key loaded' : 'Key missing')"
```

### Entry doesn't appear in dashboard

**Check:**
1. RLS policies allow anonymous reads: `CREATE POLICY "anon read activity_logs" ON activity_logs FOR SELECT USING (true);`
2. Dashboard is fetching from correct Supabase project
3. Browser console for errors (F12 → Console)
4. Timestamp is recent (dashboard may filter old entries)

## Next Steps

Once setup is complete, agents should:
1. Read their workspace `LOGGING.md` file
2. Log after completing each assigned task
3. Follow the guidelines in `docs/LOGGING.md`

---

**Questions?** Check `docs/LOGGING.md` for detailed guidelines, or escalate to Kenny.
