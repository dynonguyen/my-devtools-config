import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const outDir = resolve(__dirname, '..', '..', 'build/options');
const srcDir = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '~': srcDir } },
  base: './',

  build: {
    outDir,
    assetsDir: '',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: { output: { entryFileNames: 'index.js', assetFileNames: 'index.[ext]' } }
  }
});
