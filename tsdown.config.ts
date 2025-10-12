import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/feature.client.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@payloadcms/richtext-lexical"],
});
