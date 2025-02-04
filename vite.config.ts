import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { PlusProComponentsResolver } from '@plus-pro-components/resolver'
import vue from '@vitejs/plugin-vue'
import { toEscapedSelector as e, presetAttributify, presetUno, transformerVariantGroup } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'oopui-plugin-utils': ['ipcInvoke', 'ipcSend', 'ipcOn'],
        },
      ],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: true,
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        PlusProComponentsResolver({
          importStyle: 'scss',
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve('src/assets/icons')],
    }),
    UnoCSS({
      content: {
        pipeline: {
          include: [
            // the default
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
            // include js/ts files
            'src/**/*.{js,ts}',
          ],
          // exclude files
          // exclude: []
        },
      },
      presets: [presetUno(), presetAttributify()],
      transformers: [
        transformerVariantGroup(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
