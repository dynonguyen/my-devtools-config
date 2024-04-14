import preact from '@preact/preset-vite';
import { resolve } from 'path';
import unoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const outDir = resolve(__dirname, '..', '..', 'build/content');
const srcDir = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [unoCSS(), preact()],
  resolve: { alias: { '~': srcDir } },

  build: {
    outDir,
    assetsDir: '',
    copyPublicDir: false,
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      input: resolve(srcDir, 'main.tsx'),
      output: { entryFileNames: 'index.js', assetFileNames: 'index.[ext]', format: 'cjs' }
    }
  }
});
