import { fireEvent, render, screen } from "@testing-library/react"
import Button from "."

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button variant="primary" label="placeholder" />)
  })

  it("should pass additional props to the button", () => {
    const onClick = jest.fn()
    render(<Button variant="primary" label="Clickable" onClick={onClick} />)
    const button = screen.getByText("Clickable")
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it("should have appropriate aria-label when provided", () => {
    render(
      <Button variant="primary" label="Accessible" aria-label="Test Button" />,
    )
    const button = screen.getByLabelText("Test Button")
    expect(button).toBeTruthy()
  })

  it("should render an image for tertiary variant", () => {
    render(<Button variant="tertiary" label="With Icon" showIcon={true} />)
    const img = screen.getByTestId("image")
    expect(img).toBeTruthy()
  })
})
