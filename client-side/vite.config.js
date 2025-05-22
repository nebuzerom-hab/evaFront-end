// import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/evaFront-end/", // Important: matches your repo name
  build: {
    chunkSizeWarningLimit: 1000, // optional
  },
  server: {
    open: true,
  },
});
