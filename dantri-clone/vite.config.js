import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            // Proxy lấy dữ liệu RSS
            "/rss": {
                target: "https://dantri.com.vn",
                changeOrigin: true,
            },

            // Proxy lấy HTML bài báo
            "/article": {
                target: "https://dantri.com.vn",
                changeOrigin: true,

                // xóa prefix trước khi gửi request
                rewrite: (path) =>
                    path.replace(/^\/article/, ""),
            },
        },
    },
});