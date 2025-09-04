import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // handles TS path aliases

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // 👈 automatically uses tsconfig.json paths for TS imports
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/global-styles"), // 👈 SCSS alias
    },
  },

  server: {
    host: "localhost",
    port: 3001,
  },
});
