import { render, screen } from "@testing-library/react"
import IntroBanner from "."

describe("IntroBanner", () => {
  it("should render correctly", () => {
    render(<IntroBanner />)
  })

  it("should have correct text", () => {
    render(<IntroBanner />)

    const title = screen.getByText(
      "Keep track of your money and save for your future",
    )

    const description = screen.getByText(
      "Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.",
    )
    expect(title).toBeTruthy()
    expect(description).toBeTruthy()
  })
})
