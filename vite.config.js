import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  mode: "development", // Ensure it's in development mode
  build: {
    outDir: "build",
  },
  base: "/tommitres",
  plugins: [react()],
});
