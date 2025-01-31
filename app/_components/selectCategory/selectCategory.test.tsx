import { fireEvent, render, screen } from "@testing-library/react"
import SelectCategory from "."

describe("SelectCategory", () => {
  it("should render correctly", () => {
    render(<SelectCategory label="Category" setCategory={() => {}} />)
  })

  it("should update the selected category when an option is clicked", () => {
    const setCategoryMock = jest.fn()
    render(<SelectCategory label="Category" setCategory={setCategoryMock} />)

    fireEvent.click(screen.getByTestId("select-category-btn"))
    fireEvent.click(screen.getByText("Groceries"))

    expect(screen.getAllByText("Groceries")).toBeTruthy()
    expect(setCategoryMock).toHaveBeenCalledWith("Groceries")
  })
})
