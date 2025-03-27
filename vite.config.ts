import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Change to 0.0.0.0 if you want to access from other devices
    port: 3000, // Change 3000 to any available port
  },
});
