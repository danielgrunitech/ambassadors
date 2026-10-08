/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#1A73E8',
          blueDark: '#174EA6',
          blueLight: '#E8F0FE',
          geminiBlue: '#346BF1',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
        },
        gemini: {
          surface: '#F8FAFD',
          card: '#FFFFFF',
          border: '#E2E8F0',
          dark: '#1E1F20',
          purple: '#7C4DFF',
          pink: '#C58AF9',
          cyan: '#24C6DC',
        }
      },
      fontFamily: {
        sans: ['"Google Sans Regular"', '"Google Sans"', 'Heebo', 'Rubik', 'Assistant', 'system-ui', 'sans-serif'],
        'google-heading': ['"Google Sans Flex"', '"Google Sans"', 'Heebo', 'Rubik', 'sans-serif'],
        'google-body': ['"Google Sans Regular"', '"Google Sans"', 'Heebo', 'Assistant', 'sans-serif'],
      },
      boxShadow: {
        'gemini': '0 4px 20px -2px rgba(52, 107, 241, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'gemini-lg': '0 12px 32px -4px rgba(52, 107, 241, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'gemini-glow': '0 0 35px -5px rgba(66, 133, 244, 0.35)',
      },
      backgroundImage: {
        'gemini-gradient': 'linear-gradient(135deg, #1A73E8 0%, #7C4DFF 50%, #E8710A 100%)',
        'google-quad': 'linear-gradient(to right, #EA4335, #FBBC04, #34A853, #346BF1)',
      }
    },
  },
  plugins: [],
}
