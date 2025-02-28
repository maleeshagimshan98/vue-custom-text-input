import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Specify which files to lint
    files: ["**/*.{js,mjs,cjs,ts,tsx}"], // Include JS, MJS, CJS, TS, and TSX files
    ignores: ["node_modules", "dist", "build"], // Ignore common output directories
    languageOptions: {
      globals: globals.browser, // Enable browser global variables
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // Ensure ESLint understands TypeScript project structure
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // TypeScript plugin
      prettier: prettierPlugin, // Prettier plugin for linting formatting issues
    },
    rules: {
      // ESLint core rules
      "no-console": "warn", // Warn on console.log usage
      "no-debugger": "error", // Disallow debugger statements
      "eol-last": ["error", "always"], // Ensure LF at the end of files
      "linebreak-style": ["error", "unix"], // Enforce LF (Unix-style EOL)

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error"], // Prevent unused variables
      "@typescript-eslint/explicit-function-return-type": "warn", // Warn if functions lack return types

      // Prettier rules
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf", // Ensure LF (Line Feed) is used
          semi: true, // Require semicolons
          singleQuote: true, // Use single quotes
          trailingComma: "all", // Use trailing commas
          printWidth: 80, // Wrap lines at 80 characters
          tabWidth: 2, // Indent with 2 spaces
        },
      ],
    },
  },
  pluginJs.configs.recommended, // Recommended ESLint rules
  ...tseslint.configs.recommended, // Recommended TypeScript rules
  prettier, // Disable conflicting ESLint rules that Prettier handles
];
