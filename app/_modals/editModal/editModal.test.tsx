import { render } from "@testing-library/react"
import EditModal from "."

describe("EditModal", () => {
  it("should render correctly", () => {
    render(
      <EditModal
        title="Edit Budget"
        description="As your budgets change, feel free to update your spending limits."
      />,
    )
  })
})
