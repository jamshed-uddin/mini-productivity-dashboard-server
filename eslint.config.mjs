import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,cjs}"], // skip mjs if you’re not using ESM
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs", // <--- tells ESLint to expect require/module.exports
      globals: globals.node, // <--- enables Node globals like __dirname, process
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  },
]);
