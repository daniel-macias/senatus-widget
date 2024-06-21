import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: './src/main.ts',
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget'
            ? 'assets/js/[name].js'
            : 'assets/[name].js';
        },
      },
    },
  },
});
