import { defineConfig } from "vite";
import dotenv from "dotenv";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

dotenv.config();

export default defineConfig({
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
