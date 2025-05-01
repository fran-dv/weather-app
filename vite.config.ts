import { defineConfig } from "vite";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Map '@' to the 'src' directory
    },
  },
  define: {
    "process.env": process.env,
  },
});
