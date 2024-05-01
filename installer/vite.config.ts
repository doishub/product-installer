// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import { svelte } from '@sveltejs/vite-plugin-svelte'
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve('./src/main.ts'),
      name: 'ProductInstaller',
      // the proper extensions will be added
      fileName: 'product-installer'
    },
    rollupOptions: {
      output: {
        dir: '../public/app/',
        entryFileNames: 'app.js'
      }
    },
  },
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
