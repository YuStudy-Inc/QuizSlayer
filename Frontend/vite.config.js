import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    environment: 'jsdom',  // Ensure jsdom is being used
  },
  plugins: [react()],
});
