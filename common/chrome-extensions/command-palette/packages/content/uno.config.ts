// uno.config.ts
import presetRemToPx from '@unocss/preset-rem-to-px';
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	presetWind,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	shortcuts: [],
	theme: {
		colors: [
			'primary',
			'secondary',
			'accent',
			'success',
			'error',
			'warning',
			'info',

			'base',
			'base-100',
			'base-200',
			'base-content',

			'neutral',
			'divider',

			'grey-100',
			'grey-200',
			'grey-300',
			'grey-400',
			'grey-500',
			'grey-600',
			'grey-700',
			'grey-800',
			'grey-900',
		].reduce(
			(theme, key) => ({ ...theme, [key]: `rgba(var(--${key}), %alpha)` }),
			{},
		),
	},
	presets: [
		presetUno({ variablePrefix: 'dcp-', dark: 'class' }),
		presetWind({
			important: '#_dcp_root_',
			variablePrefix: 'dcp-',
			dark: 'class',
			preflight: false,
		}),
		presetAttributify(),
		presetIcons({
			prefix: 'i-',
			extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
		}),
		presetTypography(),
		presetRemToPx(),
		presetWebFonts({
			provider: 'google',
			fonts: { sans: 'Poppins' },
		}),
	],
	transformers: [transformerVariantGroup()],
});
