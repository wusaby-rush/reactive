/// <reference types="vitest" />

import generouted from '@generouted/react-router/plugin';
import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    lingui(),
    generouted(),
    UnoCSS(),
    Inspect(),
    topLevelAwait(),

    Unfonts({
      fontsource: {
        families: [
          {
            name: 'Lato',
            weights: [100, 300, 400, 700, 900],
          },
        ],
      },
    }),

    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    imagetools(),

    AutoImport({
      defaultExportByFilename: true,
      dirs: ['src/components/**', 'src/config/**'],
      dts: true,
      eslintrc: { enabled: true },
      imports: ['react', 'react-router-dom'],
      injectAtEnd: true,
    }),
  ],
  resolve: { alias: { '@': '/src' } },
  test: {
    environment: 'happy-dom',
  },
});
