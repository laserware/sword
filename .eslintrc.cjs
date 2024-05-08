"use strict";

module.exports = {
  extends: ["@laserware/eslint-config"],
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ["*.js", "*.svelte"],
};
