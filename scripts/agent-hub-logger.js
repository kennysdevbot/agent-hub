#!/usr/bin/env node

/**
 * Agent Hub Logger
 * 
 * CLI tool and importable module for agents to log their work to Agent Hub.
 * 
 * Usage as CLI:
 *   node agent-hub-logger.js --agent chris --model haiku-4.5 --action "Completed feature X"
 * 
 * Usage as module:
 *   const { logWork } = require('./agent-hub-logger.js')
 *   await logWork('chris', 'haiku-4.5', 'Completed feature X')
 */

const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing required environment variables:')
  console.error('   - VITE_SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const client = createClient(SUPABASE_URL, SERVICE_KEY)

/**
 * Log agent work to Agent Hub
 * @param {string} agent - Agent name (leon, jill, chris, barry)
 * @param {string} model - Model used (e.g., opus-4.6, sonnet-4.5, haiku-4.5)
 * @param {string} action - Description of work completed
 * @returns {Promise<Object>} Supabase response data
 */
async function logWork(agent, model, action) {
  if (!agent || !model || !action) {
    throw new Error('Missing required parameters: agent, model, action')
  }

  const { data, error } = await client
    .from('activity_logs')
    .insert({
      agent,
      model,
      action,
      timestamp: new Date().toISOString()
    })
    .select()
  
  if (error) {
    console.error('❌ Failed to log:', error.message)
    throw error
  }
  
  console.log('✅ Logged to Agent Hub:', action)
  return data
}

// CLI mode: parse arguments and execute
if (require.main === module) {
  const args = process.argv.slice(2)
  
  // Simple argument parser
  const getArg = (flag) => {
    const index = args.indexOf(flag)
    return index !== -1 ? args[index + 1] : null
  }

  const agent = getArg('--agent')
  const model = getArg('--model')
  const action = getArg('--action')

  if (!agent || !model || !action) {
    console.error('❌ Usage: node agent-hub-logger.js --agent <name> --model <model> --action "<description>"')
    console.error('')
    console.error('Example:')
    console.error('  node agent-hub-logger.js --agent chris --model haiku-4.5 --action "Built ProjectList view"')
    process.exit(1)
  }

  logWork(agent, model, action)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Error:', err.message)
      process.exit(1)
    })
}

module.exports = { logWork }
