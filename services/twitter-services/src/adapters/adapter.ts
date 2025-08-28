import type { Config } from '../config/types'
import type { Context } from '../core/browser/context'
import type { NaviAdapter } from './navi-adapter'
import type { MCPAdapter } from './mcp-adapter'

import { logger } from '../utils/logger'

export function useAdapter() {
  const adapters: { navi?: NaviAdapter, mcp?: MCPAdapter } = {}

  async function initAdapters(config: Config, ctx: Context): Promise<{ navi?: NaviAdapter, mcp?: MCPAdapter }> {
    // if (config.adapters.navi?.enabled) {
    //   logger.main.log('Starting Navi adapter...')
    //   const { NaviAdapter } = await import('./adapters/navi-adapter')

    //   adapters.navi = new NaviAdapter(twitterService, {
    //     url: config.adapters.navi.url,
    //     token: config.adapters.navi.token,
    //     credentials: {},
    //   })

    //   await adapters.navi.start()
    //   logger.main.log('Navi adapter started')
    // }

    if (config.adapters.mcp?.enabled) {
      logger.main.log('Starting MCP adapter...')
      const { MCPAdapter } = await import('./mcp-adapter')

      adapters.mcp = new MCPAdapter(config.adapters.mcp.port, ctx)

      await adapters.mcp.start()
      logger.main.log('MCP adapter started')
    }

    return adapters
  }

  return {
    adapters,
    initAdapters,
  }
}
