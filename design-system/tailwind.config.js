/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#4F46E5',
        'accent-dark': '#4338CA',
        grey: '#6B7280',
        'grey-light': '#9CA3AF',
        'grey-dark': '#374151',
        bg: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#111111',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'code': ['14px', '16px'],
        'body': '16px',
        'h3': '32px',
        'h2': '36px',
        'h1': '48px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'section': '120px',
        'section-mobile': '60px',
        'card-gap': '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        fast: '100ms',
        slow: '300ms',
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};
