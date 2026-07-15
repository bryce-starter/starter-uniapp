import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'
import type { Plugin } from 'vite'
import { resolve } from 'node:path'
import process from 'node:process'
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents, { kebabCase } from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createLogger, defineConfig, loadEnv } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (message, options) => {
  if (message.includes('[unocss]') && message.includes('is being imported multiple times'))
    return

  loggerWarn(message, options)
}

function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (!/^Wd[A-Z]/.test(name))
        return

      const componentName = kebabCase(name)
      return {
        from: `@wot-ui/ui/components/${componentName}/${componentName}.vue`,
      }
    },
  }
}

function VitePluginTheme(options: { themeColor: string }): Plugin {
  return {
    name: 'vite-plugin-theme',
    transform(code, id) {
      if (!id.endsWith('App.vue'))
        return

      const { themeColor } = options
      return code.replace('$themeColor', themeColor)
    },
  }
}

const cwd = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd)

  return {
    plugins: [
      VitePluginTheme({
        themeColor: env.VITE_THEME_COLOR,
      }),

      // https://uni-helper.js.org/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/uni-pages.d.ts',
      }),

      // https://uni-helper.js.org/vite-plugin-uni-layouts
      UniHelperLayouts(),

      // https://uni-helper.js.org/vite-plugin-uni-components
      UniHelperComponents({
        dts: false,
        directoryAsNamespace: true,
        resolvers: [
          WotResolver(),
        ],
      }),

      // https://uni-helper.js.org/plugin-uni
      Uni(),

      UniPolyfill(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        vueTemplate: true,
        imports: [
          'vue',
          '@vueuse/core',
          'uni-app',
          'pinia',
          {
            from: '@bryce-loskie/utils',
            imports: [
              'to',
              'sleep',
            ],
          },
          {
            from: '@tanstack/vue-query',
            imports: [
              'useQuery',
              'useMutation',
            ],
          },
        ],
        dirs: [
          'src/constants',
          'src/store',
          'src/utils',
          'src/api',
        ],
        dts: 'src/auto-imports.d.ts',
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },

    customLogger: logger,
  }
})
