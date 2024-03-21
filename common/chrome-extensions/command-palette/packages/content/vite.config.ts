import preact from '@preact/preset-vite';
import { resolve } from 'path';
import unoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const assetDir = resolve(__dirname, '..', '..', 'build/assets');
const outDir = resolve(__dirname, '..', '..', 'build/content');
const srcDir = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public/*');

export default defineConfig({
	plugins: [
		unoCSS(),
		preact(),
		viteStaticCopy({ targets: [{ src: publicDir, dest: assetDir }] }),
	],
	resolve: { alias: { '~': srcDir } },

	build: {
		outDir,
		assetsDir: '',
		copyPublicDir: false,
		emptyOutDir: false,
		sourcemap: false,
		rollupOptions: {
			input: resolve(srcDir, 'main.tsx'),
			output: {
				entryFileNames: 'index.js',
				assetFileNames: 'index.[ext]',
				format: 'cjs',
			},
		},
	},
	server: { open: true, port: 8888 },
});
