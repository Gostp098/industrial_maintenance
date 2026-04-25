import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,

  {
    plugins: {
      jest,
    },

    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        ...jest.environments.globals.globals,
      },
    },

    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];