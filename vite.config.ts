import { defineConfig } from "vite";
import dotenv from "dotenv";
import path, { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

dotenv.config();

export default defineConfig({
  base: "/weather-app/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [tailwindcss()],
});
