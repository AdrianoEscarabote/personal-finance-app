import "@testing-library/jest-dom"

const lib = jest.requireActual("tabbable")

jest.mock("tabbable", () => ({
  ...lib,
  tabbable: (node, options) =>
    lib.tabbable(node, { ...options, displayCheck: "none" }),
  focusable: (node, options) =>
    lib.focusable(node, { ...options, displayCheck: "none" }),
  isFocusable: (node, options) =>
    lib.isFocusable(node, { ...options, displayCheck: "none" }),
  isTabbable: (node, options) =>
    lib.isTabbable(node, { ...options, displayCheck: "none" }),
}))

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
