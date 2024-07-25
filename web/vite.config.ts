import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    target: "esnext",
    platform: "browser",
  },
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
