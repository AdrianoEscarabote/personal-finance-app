import { fireEvent, render, screen } from "@testing-library/react"
import ColorTag from "."

describe("ColorTag Component", () => {
  it("should render correctly", () => {
    render(<ColorTag label="Color Tag" />)
  })

  it("should toggle color list visibility when the button is clicked", () => {
    render(<ColorTag label="Color Tag" />)

    const toggleButton = screen.getByTestId("color-tag-button")
    fireEvent.click(toggleButton)

    const colorButton = screen.getByTestId("Brown")
    fireEvent.click(colorButton)

    expect(toggleButton.textContent).toContain("Brown")
  })
})
