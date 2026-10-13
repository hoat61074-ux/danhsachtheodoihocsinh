import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.jpg', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          id: '/',
          name: 'BGL Giáo Họ Tân Vạn - Theo Dõi Học Sinh',
          short_name: 'BGL Tân Vạn',
          description: 'Ứng dụng công khai tra cứu, điểm danh và theo dõi học sinh Ban Giáo Lý Giáo Họ Tân Vạn (Niên khoá 2026 – 2027).',
          theme_color: '#1d4ed8',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2}'],
          importScripts: ['/sw-logger.js'],
          navigateFallback: '/index.html',
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'process.env.APP_URL': JSON.stringify(
        process.env.APP_URL || 'https://ais-pre-jhl3frjoaxh7e3yelffd5g-860545552666.asia-southeast1.run.app'
      ),
      'import.meta.env.VITE_APP_URL': JSON.stringify(
        process.env.VITE_APP_URL || process.env.APP_URL || 'https://ais-pre-jhl3frjoaxh7e3yelffd5g-860545552666.asia-southeast1.run.app'
      ),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
