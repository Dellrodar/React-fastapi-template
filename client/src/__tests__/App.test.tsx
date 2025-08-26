import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";

vi.mock("../lib/api", () => ({
  getHealth: () => Promise.resolve({ ok: true }),
  getRoot: () => Promise.resolve({ message: "the server is now active" })
}));

test("renders API status and message", async () => {
  render(<App />);
  
  // Check for main heading
  expect(screen.getByText(/React \+ FastAPI/i)).toBeInTheDocument();
  
  // Check for API status (should show "OK" after loading)
  expect(await screen.findByText(/OK/i)).toBeInTheDocument();
  
  // Check for server message
  expect(await screen.findByText(/the server is now active/i)).toBeInTheDocument();
});

test("handles API errors gracefully", async () => {
  // Mock API calls to throw errors
  vi.mocked(await import("../lib/api")).getHealth.mockRejectedValue(new Error("Network error"));
  vi.mocked(await import("../lib/api")).getRoot.mockRejectedValue(new Error("Network error"));
  
  render(<App />);
  
  // Should show "DOWN" status when API fails
  expect(await screen.findByText(/DOWN/i)).toBeInTheDocument();
});
