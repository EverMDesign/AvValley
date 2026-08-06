/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A1322',           // Dark background (dark sections, dark cards)
          secondary: '#0E1B31',    // Slightly lighter dark (alternate dark sections)
          card: '#111E33',         // Dark card background
          border: '#23344F',       // Border color for dark backgrounds
          blue: '#169ADC',         // Primary CTA color
          hover: '#1AAFE8',        // Hover state for CTAs
          text: '#FFFFFF',         // Primary text color (white text on dark)
          muted: '#B8C4D6',        // Secondary text color (muted white)
          grey: '#F3F4F6',         // Light grey background (sections, cards)
          dark: '#1F2937'          // Dark text (use on light/grey backgrounds)
        }
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '4px',
        md: '8px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
