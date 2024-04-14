import { resolve } from 'path';
import { defineConfig } from 'vite';

const outDir = resolve(__dirname, '..', '..', 'build');
const srcDir = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
	plugins: [],
	resolve: { alias: { '~': srcDir } },
	publicDir,
	build: {
		outDir,
		assetsDir: '',
		emptyOutDir: false,
		sourcemap: false,
		rollupOptions: {
			input: resolve(srcDir, 'main.ts'),
			output: { entryFileNames: 'background/index.js' },
		},
	},
});
