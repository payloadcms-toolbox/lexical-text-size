import { defineConfig, type Options } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";

const commonConfig: Partial<Options> = {
  format: ["esm"],
  dts: true,
  sourcemap: true,
  minify: true,
  external: ["react", "react-dom", "react/jsx-runtime", /^@payloadcms\/.*/],
  esbuildPlugins: [vanillaExtractPlugin()],
  injectStyle: false,
};

export default defineConfig([
  {
    ...commonConfig,
    entry: {
      index: "src/index.ts",
    },
    clean: true,
  },
  {
    ...commonConfig,
    entry: {
      "feature.client": "src/feature.client.tsx",
    },
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
]);
