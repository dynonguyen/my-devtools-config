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
	shortcuts: [
		{ divider: 'h-0.25 bg-divider w-full' },
		{ 'flex-center': 'flex justify-center items-center' },
		[/^size-(\d*)$/, ([_, s]) => `w-${s} h-${s}`],
	],
	theme: {
		colors: [
			'primary',
			'secondary',
			'accent',
			'success',
			'error',
			'warning',
			'info',

			'base-100',
			'base-200',
			'base-300',
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
		presetAttributify({ prefix: 'un', prefixedOnly: true }),
		presetIcons({
			prefix: 'i-',
			extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
		}),
		presetTypography(),
		presetRemToPx(),
		presetWebFonts({
			provider: 'google',
			fonts: { sans: ['Inter', 'Inter:400,500,600:700'] },
		}),
	],
	preflights: [
		{
			getCSS: () =>
				`#_dcp_root_ * { box-sizing: border-box; color: var(--base-content); font-family: 'Inter', sans-serif }`,
		},
	],
	transformers: [transformerVariantGroup()],
});
