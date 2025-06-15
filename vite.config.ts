
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ! 根據您要部署的 repo 名稱調整 base
const REPO_NAME = "static-forge-tables"; // ⚠️請改成您的 repo 名稱

export default defineConfig(({ mode }) => ({
  base: `/${REPO_NAME}/`,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
