import { render, screen } from "@testing-library/react"
import EditModal from "."

describe("EditModal", () => {
  it("should render correctly with default props", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="As your budgets change, feel free to update your spending limits."
        showPotName={false}
        showbudgetCategory={true}
      />,
    )

    expect(screen.getByText("Edit Budget")).toBeTruthy()
    expect(
      screen.getByText(
        "As your budgets change, feel free to update your spending limits.",
      ),
    ).toBeTruthy()
    expect(screen.getByRole("button", { name: "Save Changes" })).toBeTruthy()
  })

  it("should render the Pot Name input when showPotName is true", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="Update your pot name."
        showPotName={true}
        showbudgetCategory={false}
      />,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should always render the Maximum Spend input", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="Set your spending limits."
        showPotName={false}
        showbudgetCategory={true}
      />,
    )

    expect(screen.getByText("Maximum Spend")).toBeTruthy()
  })

  it("should always render the ColorTag component", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="Choose a theme color."
        showPotName={false}
        showbudgetCategory={true}
      />,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })

  it("should render the close button", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="Update your spending limits."
        showPotName={false}
        showbudgetCategory={true}
      />,
    )

    const closeButton = screen.getByRole("button", { name: "" })
    expect(closeButton).toBeTruthy()
  })
})
