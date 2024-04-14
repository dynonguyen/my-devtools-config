// uno.config.ts
import presetRemToPx from '@unocss/preset-rem-to-px';
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      divider: 'h-0.25 bg-divider w-full',
      btn: 'py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none outline-none cursor-pointer transition-colors'
    },
    [/^btn-(.*)$/, ([_, c]) => `bg-${c} hover:bg-${c}/85 focus:outline focus:outline-solid focus:outline-${c}/90`],
    { 'flex-center': 'flex justify-center items-center' },
    [/^size-(.*)$/, ([_, s]) => `w-${s} h-${s}`],
    {
      input:
        'h-10 px-3 py-2 text-base-content text-sm outline-none border border-solid border-grey-300 dark:border-grey-700 rounded-lg bg-transparent transition-colors hover:(border-grey-400 dark:border-grey-600) focus:(!border-primary) [&.error]:(bg-error/10 !border-error)'
    }
  ],
  rules: [],
  theme: {
    colors: [
      'primary',
      'secondary',
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
      'grey-900'
    ].reduce((theme, key) => ({ ...theme, [key]: `rgba(var(--${key}), %alpha)` }), {})
  },
  presets: [
    presetUno({ variablePrefix: 'dcp-', dark: 'class' }),
    presetWind({
      important: '#_dcp_root_',
      variablePrefix: 'dcp-',
      dark: 'class',
      preflight: false
    }),
    presetIcons({
      prefix: 'i-',
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    }),
    presetTypography(),
    presetRemToPx(),
    presetWebFonts({
      provider: 'google',
      fonts: { sans: ['Inter', 'Inter:400,500,600:700'] }
    })
  ],
  preflights: [
    {
      getCSS: () =>
        `#_dcp_root_ * { box-sizing: border-box; color: var(--base-content); font-family: 'Inter', sans-serif }`
    }
  ],
  transformers: [transformerVariantGroup()],
  autocomplete: {
    templates: ['btn-<color>'],
    shorthands: {
      color: '(primary|secondary|info|success|warning|error|grey-500|rose|orange|purple|pink|cyan|blue|yellow)'
    }
  }
});
