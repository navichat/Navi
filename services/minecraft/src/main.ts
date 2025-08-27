import process, { exit } from 'node:process'

import MineflayerArmorManager from 'mineflayer-armor-manager'

import { Client } from '@proj-navi/server-sdk'
import { loader as MineflayerAutoEat } from 'mineflayer-auto-eat'
import { plugin as MineflayerCollectBlock } from 'mineflayer-collectblock'
import { pathfinder as MineflayerPathfinder } from 'mineflayer-pathfinder'
import { plugin as MineflayerPVP } from 'mineflayer-pvp'
import { plugin as MineflayerTool } from 'mineflayer-tool'

import { initBot } from './composables/bot'
import { config, initEnv } from './composables/config'
import { createNeuriAgent } from './composables/neuri'
import { LLMAgent } from './libs/llm-agent'
import { wrapPlugin } from './libs/mineflayer'
import { initLogger, useLogger } from './utils/logger'

async function main() {
  initLogger() // todo: save logs to file
  initEnv()

  const { bot } = await initBot({
    botConfig: config.bot,
    plugins: [
      wrapPlugin(MineflayerArmorManager),
      wrapPlugin(MineflayerAutoEat),
      wrapPlugin(MineflayerCollectBlock),
      wrapPlugin(MineflayerPathfinder),
      wrapPlugin(MineflayerPVP),
      wrapPlugin(MineflayerTool),
    ],
  })

  // Connect navi server
  const naviClient = new Client({
    name: config.navi.clientName,
    url: config.navi.wsBaseUrl,
  })

  // Dynamically load LLMAgent after the bot is initialized
  const agent = await createNeuriAgent(bot)
  await bot.loadPlugin(LLMAgent({ agent, naviClient }))

  process.on('SIGINT', () => {
    bot.stop()
    exit(0)
  })
}

main().catch((err: Error) => {
  useLogger().errorWithError('Fatal error', err)
  exit(1)
})
