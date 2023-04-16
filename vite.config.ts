/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1337,
  },
  plugins: [react(), eslint(), svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/utils/tests-setup.ts",
  },
});
