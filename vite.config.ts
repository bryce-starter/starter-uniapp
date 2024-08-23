import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'

function VitePluginUniPolyfill(): Plugin {
  return {
    name: 'vite-plugin-uni-polyfill',
    transform(code, id) {
      if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js'))
        return
      code += `
// polyfill for @vueuse/core
export const render = () => {}
export const TransitionGroup = {}
`
      return code
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/uni-helper/vite-plugin-uni-pages
    UniHelperPages({
      dts: 'src/uni-pages.d.ts',
    }),

    VitePluginUniPolyfill(),

    // https://github.com/uni-helper/vite-plugin-uni-components
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
      resolvers: [
        WotResolver(),
      ],
    }),

    Uni({
      vueOptions: {
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'pinia',
        'vue',
        'uni-app',
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
        {
          from: '@vueuse/core',
          imports: [
            'useVModel',
            'until',
          ],
        },
      ],
      dirs: [
        'src/store',
        'src/utils',
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
})
