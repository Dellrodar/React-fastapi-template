import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, vi } from "vitest";
import App from "../App";
import { apiClient } from "../lib/api";

// Create axios mock adapter for our specific API client instance
const mockAxios = new MockAdapter(apiClient);

beforeEach(() => {
  mockAxios.reset();
  // Clear any previous console warnings/errors from tests
  vi.clearAllMocks();
});

afterEach(() => {
  mockAxios.restore();
});

test("renders API status and message", async () => {
  // Mock successful API responses
  mockAxios.onGet("/health").reply(200, { ok: true });
  mockAxios.onGet("/").reply(200, { message: "the server is now active" });

  render(<App />);

  // Check for main heading
  expect(screen.getByText(/React \+ FastAPI/i)).toBeInTheDocument();

  // Check for API status (should show "OK" after loading)
  expect(await screen.findByText(/OK/i)).toBeInTheDocument();

  // Check for server message
  expect(await screen.findByText(/the server is now active/i)).toBeInTheDocument();
});

test("handles API errors gracefully", async () => {
  // Mock API calls to fail with network errors
  mockAxios.onGet("/health").networkError();
  mockAxios.onGet("/").networkError();

  render(<App />);

  // Should show "DOWN" status when API fails
  expect(await screen.findByText(/DOWN/i)).toBeInTheDocument();

  // Should show error message
  expect(await screen.findByText(/Unable to connect to server/i)).toBeInTheDocument();
});

test("handles server errors gracefully", async () => {
  // Mock API calls to return server errors
  mockAxios.onGet("/health").reply(500, { error: "Internal Server Error" });
  mockAxios.onGet("/").reply(404, { error: "Not Found" });

  render(<App />);

  // Should show "DOWN" status when server returns errors
  expect(await screen.findByText(/DOWN/i)).toBeInTheDocument();

  // Should show error message
  expect(await screen.findByText(/Unable to connect to server/i)).toBeInTheDocument();
});
