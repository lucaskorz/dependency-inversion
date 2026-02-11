import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      "dist/**",
      "node_modules/**"
    ],
    coverage: {
      provider: "v8",
      exclude: [
        "dist/**"
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tests": path.resolve(__dirname, "__tests__"),
    },
  },
});
