import { fileURLToPath } from "node:url";

import { filePatterns, getBaseConfigs } from "@laserware/eslint-config/base";

const thisDirPath = fileURLToPath(new URL(".", import.meta.url));

const baseConfigs = getBaseConfigs({
  tsConfigRootDir: thisDirPath,
  tsConfigFiles: ["./tsconfig.json"],
});

export default [
  ...baseConfigs,
  {
    files: filePatterns.typescript,
    rules: {
      "import/extensions": "off",
    },
  },
  {
    ignores: [
      "eslint.config.mjs",
      "**/*.svelte",
      "*.cjs",
      "*.js",
      "*.svelte",
      "./example",
      "example",
    ],
  },
];
