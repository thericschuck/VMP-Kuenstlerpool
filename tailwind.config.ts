import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        dark:         'var(--color-dark)',
        orange:       'var(--color-orange)',
        'orange-light': 'var(--color-orange-light)',
        'orange-text':  'var(--color-orange-text)',
        muted:        'var(--color-muted)',
        subtle:       'var(--color-subtle)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

export default config
