import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // 👈 import the plugin

export default defineConfig({
  plugins: [react(), tsconfigPaths()], // 👈 add it here
  server: {
    host: 'localhost', // or 0.0.0.0 to access externally
    port: 3001,
  },
});
