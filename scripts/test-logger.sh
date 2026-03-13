#!/bin/bash

# Test script for agent-hub-logger
# Run this after setting SUPABASE_SERVICE_ROLE_KEY in .env

echo "🧪 Testing Agent Hub Logger"
echo ""

# Check if .env has required keys
if ! grep -q "SUPABASE_SERVICE_ROLE_KEY" ../.env; then
  echo "⚠️  Warning: SUPABASE_SERVICE_ROLE_KEY not found in .env"
  echo "   Add it to .env before running real tests"
  echo ""
fi

# Sample logs from each agent type
echo "📝 Sample logs that will be created:"
echo ""

echo "1. Leon (Principal Architect):"
echo "   node agent-hub-logger.js --agent leon --model opus-4.6 --action \"Architecture decision: Event sourcing pattern for activity logs\""
echo ""

echo "2. Jill (Senior Engineer):"
echo "   node agent-hub-logger.js --agent jill --model sonnet-4.5 --action \"Completed: Agent Hub logging infrastructure\""
echo ""

echo "3. Chris (Mid-Level Engineer):"
echo "   node agent-hub-logger.js --agent chris --model sonnet-4.5 --action \"Completed feature: ProjectList view component\""
echo ""

echo "4. Barry (Junior Engineer):"
echo "   node agent-hub-logger.js --agent barry --model haiku-4.5 --action \"Completed: Updated README with logging instructions\""
echo ""

echo "Would you like to run these tests? (requires SUPABASE_SERVICE_ROLE_KEY in .env)"
echo "Press Ctrl+C to cancel, or run each command manually to test."
