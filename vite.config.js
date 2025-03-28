import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Expense Tracker",
        short_name: "Tracker",
        start_url: "/expense-tracker/",
        display: "standalone",  // Makes it fullscreen
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/expense-tracker/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/expense-tracker/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      }
    })
  ],
  base: "/expense-tracker/"
});
