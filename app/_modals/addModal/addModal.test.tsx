import { render } from "@testing-library/react"
import AddModal from "."

describe("AddModal", () => {
  it("should render correctly", () => {
    render(
      <AddModal
        title="Add New Pot"
        description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
        textButton="Add Pot"
      />,
    )
  })
})
