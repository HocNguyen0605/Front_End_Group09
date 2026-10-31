import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/rss": {
        target: "https://dantri.com.vn",
        changeOrigin: true,
      },
    },
  },
});