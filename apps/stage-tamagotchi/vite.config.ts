import { join, resolve } from 'node:path'

import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Yaml from 'unplugin-yaml/vite'
import VitePluginVueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

import { Download } from '@proj-navi/unplugin-fetch'
import { DownloadLive2DSDK } from '@proj-navi/unplugin-live2d-sdk'
import { templateCompilerOptions } from '@tresjs/core'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@proj-navi/stage-ui/*',
      '@proj-navi/drizzle-duckdb-wasm',
      '@proj-navi/drizzle-duckdb-wasm/*',
    ],
  },
  resolve: {
    alias: {
      '@proj-navi/stage-ui/components/scenarios/settings/model-settings': resolve(join(import.meta.dirname, '..', '..', 'packages', 'stage-ui', 'src', 'components', 'Scenarios', 'Settings', 'ModelSettings')),
      '@proj-navi/stage-ui/components/scenes': resolve(join(import.meta.dirname, '..', '..', 'packages', 'stage-ui', 'src', 'components', 'Scenes')),
      '@proj-navi/stage-ui/stores': resolve(join(import.meta.dirname, '..', '..', 'packages', 'stage-ui', 'src', 'stores')),
      '@proj-navi/stage-ui': resolve(join(import.meta.dirname, '..', '..', 'packages', 'stage-ui', 'src')),
      '@proj-navi/i18n': resolve(join(import.meta.dirname, '..', '..', 'packages', 'i18n', 'src')),
    },
  },
  plugins: [
    Yaml(),

    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          ...templateCompilerOptions,
        }),
        vueJsx: false,
      },
      betterDefine: false,
    }),

    VueRouter({
      dts: resolve(import.meta.dirname, 'src/typed-router.d.ts'),
      routesFolder: 'src/pages',
    }),

    VitePluginVueDevTools(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    UnoCss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
    }),

    DownloadLive2DSDK(),
    Download('https://dist.ayaka.moe/live2d-models/hiyori_free_zh.zip', 'hiyori_free_zh.zip', 'assets/live2d/models'),
    Download('https://dist.ayaka.moe/live2d-models/hiyori_pro_zh.zip', 'hiyori_pro_zh.zip', 'assets/live2d/models'),
    Download('https://dist.ayaka.moe/vrm-models/VRoid-Hub/AvatarSample-A/AvatarSample_A.vrm', 'AvatarSample_A.vrm', 'assets/vrm/models/AvatarSample-A'),
    Download('https://dist.ayaka.moe/vrm-models/VRoid-Hub/AvatarSample-B/AvatarSample_B.vrm', 'AvatarSample_B.vrm', 'assets/vrm/models/AvatarSample-B'),
  ],
  server: {
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
})
