import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "fs";
import { resolve } from "path";

function copy404Plugin() {
  return {
    name: "copy-404",
    closeBundle() {
      const outDir = resolve(__dirname, "dist");
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copy404Plugin()],
  css: {
    postcss: "./postcss.config.js",
  },
  base: "/Ecommerce-Site",
});
