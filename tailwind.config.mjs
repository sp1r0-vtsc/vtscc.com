/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2337ff',
        secondary: '#000d8a',
      },
      animation: {
        'spiral': 'spiralAndZoom 4s ease-in-out forwards',
        'fade': 'fadeInBackground 2s ease-in-out forwards',
      },
      maxWidth: {
        'narrow': '640px',
        'medium': '768px',
        'wide': '1280px',
        'max': '1536px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
        lg: {
          css: {
            maxWidth: 'none',
          },
        },
        xl: {
          css: {
            maxWidth: 'none',
          },
        },
        '2xl': {
          css: {
            maxWidth: 'none',
          },
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};