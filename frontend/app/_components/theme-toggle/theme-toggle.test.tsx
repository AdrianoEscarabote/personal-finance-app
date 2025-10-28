/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"

import ThemeToggle from "."

const setThemeMock = jest.fn()
const setIsMinimizedMock = jest.fn()

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: setThemeMock }),
}))

jest.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: () => false,
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render correctly", () => {
    render(
      <ThemeToggle isMinimized={false} setIsMinimized={setIsMinimizedMock} />,
    )
  })

  it("should toggle theme on click", () => {
    render(
      <ThemeToggle isMinimized={false} setIsMinimized={setIsMinimizedMock} />,
    )
    const btn = screen.getByRole("button", { name: /toggle theme/i })
    fireEvent.click(btn)
    expect(setThemeMock).toHaveBeenCalledWith("dark")
  })

  it('should call "setIsMinimized" when clicking Minimize Menu (desktop)', () => {
    render(
      <ThemeToggle isMinimized={false} setIsMinimized={setIsMinimizedMock} />,
    )
    fireEvent.click(screen.getByText(/minimize menu/i))
    expect(setIsMinimizedMock).toHaveBeenCalledWith(true)
  })
})
