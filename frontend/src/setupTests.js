// src/setupTests.js
import '@testing-library/jest-dom';

// Mock Vite and plugins
jest.mock('vite', () => ({
  defineConfig: jest.fn((config) => config),
}));

jest.mock('@vitejs/plugin-react', () => () => ({}));

// Mock environment
jest.mock('./environment', () => ({
  API_URL: 'http://localhost:5000',
}));

// Mock i18n hook
jest.mock('./i18n', () => ({
  useI18n: () => ({
    t: (key) => key, // Return the key as the translation
    language: 'en',
    setLanguage: jest.fn(),
  }),
  I18nProvider: ({ children }) => children, // Simple passthrough provider
}));