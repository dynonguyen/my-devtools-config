import preact from '@preact/preset-vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const srcDir = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
const publicDir = resolve(__dirname, 'public');
const pageDir = resolve(srcDir, 'pages');

export default defineConfig({
	plugins: [
		preact(),
		viteStaticCopy({
			targets: [{ src: resolve(__dirname, 'manifest.json'), dest: outDir }],
		}),
	],
	resolve: {
		alias: {
			'@content': resolve(pageDir, 'content'),
			'@type': resolve(srcDir, 'types'),
		},
	},
	publicDir,
	build: {
		emptyOutDir: true,
		outDir,
		assetsDir: '',
		modulePreload: false,
		rollupOptions: {
			input: {
				background: resolve(pageDir, 'background/index.ts'),
				content: resolve(pageDir, 'content/index.tsx'),
				devtools: resolve(pageDir, 'devtools/index.html'),
				newtab: resolve(pageDir, 'newtab/index.html'),
				options: resolve(pageDir, 'options/index.html'),
				panel: resolve(pageDir, 'panel/index.html'),
				popup: resolve(pageDir, 'popup/index.html'),
			},
			output: { entryFileNames: '[name]/index.js' },
		},
		sourcemap: false,
	},
});
