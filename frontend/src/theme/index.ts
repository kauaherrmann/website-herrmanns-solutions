import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Chakra UI v3 theming uses defineConfig + createSystem
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e7f1ff' },
          100: { value: '#c2d6ff' },
          200: { value: '#9cbcff' },
          300: { value: '#76a2ff' },
          400: { value: '#5088ff' },
          500: { value: '#2a6eff' },
          600: { value: '#2157cc' },
          700: { value: '#194199' },
          800: { value: '#102b66' },
          900: { value: '#081633' },
        },
      },
      fonts: {
        heading: { value: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
        body: { value: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
      },
    },
  },
  // Enable CSS reset (preflight) globally
  preflight: true,
});

const system = createSystem(defaultConfig, config);

export default system;