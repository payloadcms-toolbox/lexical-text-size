import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/feature.client.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
