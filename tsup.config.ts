import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  dts: true,
  format: "esm",
  minify: false,
  platform: "browser",
  sourcemap: true,
  target: "esnext",
  treeshake: false,
  tsconfig: "./tsconfig.build.json",
});
