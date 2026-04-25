module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true, // Add this to recognize Node.js globals (process, module, global)
  },

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],

  plugins: ["react", "react-hooks"],

  settings: {
    react: {
      version: "detect"
    }
  },

  rules: {
    // Turn off rules that cause issues in React 17+
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/display-name": "off", // Don't require display names
    "react/prop-types": "off", // Turn off if you're not using prop-types
    
    // Handle undefined variables better
    "no-undef": "warn", // Change from error to warning
    
    // React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    
    // Other useful rules
    "no-unused-vars": ["warn", { 
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_" 
    }],
  },

  // Add overrides for test and mock files
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "**/__mocks__/**/*.js"],
      rules: {
        "no-undef": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
      },
    },
    {
      files: ["src/setupTests.js", "src/jest.setup.js"],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        "no-undef": "off",
      },
    },
  ],
};