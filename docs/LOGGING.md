# Agent Logging Guidelines

This document defines what, when, and how agents should log their work to the Agent Hub.

## Philosophy

Logging provides **observability without interruption**. Agents log completed work, major decisions, and escalations — creating a timeline that Kenny can review without needing to ask "what did you do?"

## What to Log

### ✅ Log These Events

- **Task completion:** When you finish implementing a feature or fixing a bug
- **Escalations:** When you delegate work to another agent
- **Blockers:** When you hit a problem that stops progress
- **Architecture decisions:** When you choose a technical approach
- **Code reviews:** When you review or approve work
- **Deployments:** When you ship changes to production
- **Significant milestones:** When you reach a meaningful checkpoint

### ❌ Don't Log These

- Routine operations (reading files, running tests during development)
- Incremental progress within a single task
- Tool usage details (that's what session logs are for)
- Personal "thoughts" or musings
- Anything that happens more than once per hour

**Rule of thumb:** If it's worth telling Kenny about in a summary, log it.

## When to Log

**✅ Good timing:**
- After you complete your assigned task
- When you hand off work to another agent
- When you deploy or merge code
- When you make a decision that affects the project

**❌ Bad timing:**
- Every 5 minutes during active work
- Before you've actually completed the task
- For every single file edit or commit

## Log Format

```javascript
{
  agent: "name",        // leon, jill, chris, or barry
  model: "model-name",  // opus-4.6, sonnet-4.5, haiku-4.5, etc.
  action: "description" // Clear, actionable description
}
```

### Writing Good Action Descriptions

**✅ Good examples:**
- `"Completed feature: ProjectList view component"`
- `"Escalated to Jill: task complexity exceeded Chris scope"`
- `"Fixed bug: RLS policy preventing anonymous reads"`
- `"Architecture decision: Using Supabase RLS for access control"`
- `"Deployed agent-hub v1.0 to GitHub Pages"`
- `"Code review approved: PR #42 logging infrastructure"`

**❌ Bad examples:**
- `"Working on stuff"` (too vague)
- `"Read the code"` (not a milestone)
- `"Updated files"` (not specific)
- `"Thinking about architecture"` (not actionable)
- `"Fixed typo in README.md"` (too granular, unless critical)

### Action Categories

Use these prefixes to make logs scannable:

- **Completed:** Finished implementation
- **Escalated:** Delegated to another agent
- **Fixed:** Resolved a bug or issue
- **Deployed:** Shipped to production
- **Reviewed:** Code review activity
- **Architecture decision:** Technical choice made
- **Blocked:** Hit a blocker needing attention
- **Milestone:** Significant progress checkpoint

## How to Log

### CLI Usage

```bash
cd /data/.openclaw/workspace/repos/agent-hub
node scripts/agent-hub-logger.js \
  --agent <your-name> \
  --model <model-used> \
  --action "<description>"
```

### Programmatic Usage

```javascript
const { logWork } = require('./scripts/agent-hub-logger.js')

await logWork('chris', 'sonnet-4.5', 'Completed feature: ProjectList view')
```

### Environment Setup

Required environment variables:
- `VITE_SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key for write access

These should be in your `.env` file in the agent-hub repo root.

## Examples by Agent Type

### Leon (Opus) — Principal Architect

```bash
--agent leon --model opus-4.6 --action "Architecture decision: Event sourcing pattern for activity logs"
--agent leon --model opus-4.6 --action "Completed: Multi-tenant RLS policy system"
--agent leon --model opus-4.6 --action "Escalated to Jill: Implementation of designed auth system"
```

### Jill (Sonnet) — Senior Engineer

```bash
--agent jill --model sonnet-4.5 --action "Completed: Activity log filtering and pagination"
--agent jill --model sonnet-4.5 --action "Fixed bug: Race condition in Supabase subscription"
--agent jill --model sonnet-4.5 --action "Reviewed PR #12: Chris's ProjectList implementation"
```

### Chris (Sonnet) — Mid-Level Engineer

```bash
--agent chris --model sonnet-4.5 --action "Completed feature: ProjectList view component"
--agent chris --model sonnet-4.5 --action "Fixed: Missing error handling in TaskCard"
--agent chris --model sonnet-4.5 --action "Escalated to Jill: Complex state management needed"
```

### Barry (Haiku) — Junior Engineer

```bash
--agent barry --model haiku-4.5 --action "Completed: Updated README with setup instructions"
--agent barry --model haiku-4.5 --action "Fixed: Typos in component prop types"
--agent barry --model haiku-4.5 --action "Completed: Added loading states to all views"
```

## Verification

After logging, verify your entry appears in the Agent Hub dashboard:

1. Visit the deployed Agent Hub: https://[your-github-pages-url]
2. Navigate to the **Activity Log** tab
3. Confirm your entry is visible with correct timestamp

## Troubleshooting

**Error: Missing environment variables**
- Ensure `.env` file exists in `repos/agent-hub/`
- Check that `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set

**Error: Failed to log**
- Verify Supabase connection
- Check service role key has write permissions
- Ensure `activity_logs` table exists

**Entry doesn't appear in dashboard**
- Check RLS policies allow anonymous reads
- Verify timestamp is recent (dashboard may filter old entries)
- Check browser console for errors

## Best Practices

1. **Log after completion, not during work**
2. **Be specific about what was accomplished**
3. **Include context for escalations (why you escalated)**
4. **Use consistent naming for features/bugs**
5. **Don't over-log — quality over quantity**
6. **If you wouldn't mention it in a standup, don't log it**

---

**Remember:** Logs are for Kenny to see what happened. Write them for a human reviewing the timeline, not for a machine.
