// src/App.test.js
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the i18n module
jest.mock('./i18n', () => ({
  useI18n: () => ({
    t: (key) => key,
    language: 'en',
    setLanguage: jest.fn(),
  }),
  I18nProvider: ({ children }) => <>{children}</>,
}));

// Mock Navbar (if it's causing issues)
jest.mock('./components/Navbar', () => () => <nav data-testid="navbar">Mock Navbar</nav>);

// Mock Footer
jest.mock('./components/Footer', () => () => <footer>Mock Footer</footer>);

// Mock ScrollToTop
jest.mock('./components/ScrollToTop', () => () => null);

// Mock pages
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Services', () => () => <div>Services Page</div>);
jest.mock('./pages/Request', () => () => <div>Request Page</div>);

test("renders app without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(container).toBeDefined();
});

test("navbar is rendered", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(getByTestId('navbar')).toBeInTheDocument();
});