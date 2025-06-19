import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      boxShadow: {
        login: '0px 0px 30px -1px rgba(0, 0, 0, 0.06)',
        profileCard: '0px 10px 60px rgba(226, 236, 249, 0.50)',
        notificationHover: '3px 3px 12px 0px rgba(232, 58, 122, 0.28)',
        custom: '0px 4px 8px 0px rgba(0, 0, 0, 0.05)',
        ultralight: '0px 4px 4px 0px rgba(0, 0, 0, 0.03)',
        loginWrapper: '0px 0px 23.6px 0px #0000000D'
      }
    },
    container: {
      padding: {
        xl: '40px',
        '2xl': '48px'
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('btnActive', '&.active');
      addVariant('last-1-child', '&:nth-last-child(-n + 1)');
    })
  ]
};
