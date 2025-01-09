import { defineConfig as testConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// Vite configuration
const config = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({ tsconfigPath: "./tsconfig.app.json" }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "react-i18n-thin",
      fileName: "react-i18n-thin",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "reactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});

// Vitest configuration
const tstConfig = testConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});

// Merge configurations
export default {
  ...config,
  ...tstConfig,
};
