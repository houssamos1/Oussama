/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,html}",
  ],
  theme: {
    extend: {
      colors: {
        govBlue: {
          dark: '#1e40af',
          light: '#3b82f6',
        },
        marocRed: '#dc2626',
        marocGreen: '#059669',
        surfaceDark: '#1f2937',
        surfaceDarker: '#111827'
      },
      boxShadow: {
        soft: '0 4px 16px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [],
}

