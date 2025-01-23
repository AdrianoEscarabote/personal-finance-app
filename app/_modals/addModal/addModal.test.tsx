import { render, screen } from "@testing-library/react"
import AddModal from "."

describe("AddModal", () => {
  it("should render correctly", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
        textButton="Add Pot"
        showPotName={true}
        showMaximumSpend={false}
        showBudgetCategory={false}
        showTarget={true}
      />,
    )
  })
  it("should display the Pot Name input when showPotName is true", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Add a pot name."
        textButton="Add Pot"
        showPotName={true}
        showMaximumSpend={false}
        showBudgetCategory={false}
        showTarget={true}
      />,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should not display the Pot Name input when showPotName is false", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Add a pot name."
        textButton="Add Pot"
        showPotName={false}
        showMaximumSpend={false}
        showBudgetCategory={false}
        showTarget={true}
      />,
    )

    expect(screen.queryByLabelText("Pot Name")).toBeFalsy()
  })

  it("should display the Budget Category dropdown when showBudgetCategory is true", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Select a budget category."
        textButton="Add Pot"
        showBudgetCategory={true}
        showPotName={false}
        showMaximumSpend={false}
        showTarget={true}
      />,
    )

    expect(screen.getByText("Budget Category")).toBeTruthy()
  })

  it("should display the ColorTag component", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Select a theme color."
        textButton="Add Pot"
        showBudgetCategory={true}
        showPotName={false}
        showMaximumSpend={false}
        showTarget={true}
      />,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })
})
