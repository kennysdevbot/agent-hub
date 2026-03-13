# Demo: How to Use the Logger

This file demonstrates the logging infrastructure in action.

## Example Log Entry

When Jill completes this task, she would run:

```bash
cd /data/.openclaw/workspace/repos/agent-hub
node scripts/agent-hub-logger.js \
  --agent jill \
  --model sonnet-4.5 \
  --action "Completed: Agent Hub logging infrastructure"
```

## Expected Output

```
✅ Logged to Agent Hub: Completed: Agent Hub logging infrastructure
```

## What Gets Stored

```json
{
  "id": "uuid-generated-by-supabase",
  "agent": "jill",
  "model": "sonnet-4.5",
  "action": "Completed: Agent Hub logging infrastructure",
  "timestamp": "2025-03-13T09:45:00.000Z"
}
```

## How It Appears in Dashboard

In the Activity Log view, users would see:

| Agent | Model | Action | Time |
|-------|-------|--------|------|
| Jill | sonnet-4.5 | Completed: Agent Hub logging infrastructure | 2025-03-13 09:45 |

## Next: Set Up Service Key

Before this works, Kenny needs to:
1. Get service role key from Supabase dashboard
2. Add to `repos/agent-hub/.env`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
3. Test with the command above

See `docs/AGENT_SETUP.md` for detailed instructions.
