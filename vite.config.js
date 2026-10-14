import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
 plugins: [
    vue(),
    
VitePWA({
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.js',
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico'],
  manifest: false
})

  ],

  server: {
    host: true,     
    port: 5173,
  },
});
