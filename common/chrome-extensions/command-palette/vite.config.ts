import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		emptyOutDir: true,
		outDir: 'build',
		assetsDir: '',
		rollupOptions: { output: { entryFileNames: 'index.js' } },
	},
});
