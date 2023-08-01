/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        opacity: {
          '0%': {
            opacity: 0.2,
          },
          '100%': {
            opacity: 1,
          },
        },
        'arrow-left': {
          '0%': {
            transform: 'translateX(30%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'arrow-right': {
          '0%': {
            transform: 'translateX(-30%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'arrow-top': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        opacity: 'opacity 0.3s',
        'arrow-left': 'arrow-left 0.3s',
        'arrow-right': 'arrow-right 0.3s',
        'arrow-top': 'arrow-top 0.3s',
      },
      padding: {
        xl: '240px',
        sm: '48px',
      },
      boxShadow: {
        login: '13px 13px 40px #d9d9d9, -13px -13px 40px #ffffff',
        login1: '3px 3px 10px #d9d9d9, -3px -3px 10px #ffffff',
      },
      transitionProperty: { buttonLogin: 'all .35s ease' },

      backgroundImage: {
        'background-login':
          "linear-gradient(0, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),url('https://toplist.vn/images/800px/sup-lo-84443.jpg')",
        'background-home':
          "url('https://cdn.shopify.com/s/files/1/0376/9440/6700/files/newsletter-bg.jpg?v=1629543119&fbclid=IwAR2e9wGtb3uV_AbVs768Jf2vHNPqPpnSIHqtEpGcng8hsFhguzqeUM3LCCk')",
      },
    },
  },
  // plugins: [require('@tailwindcss/forms')],
};
