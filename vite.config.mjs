import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteBundleAnalyser from 'vite-bundle-analyzer';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    viteBundleAnalyser({
      enabled: false,
    }),
  ],
  resolve: {
    alias: {
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  build: {
    // cssMinify: 'lightningcss',
    sourcemap: 'hidden',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
