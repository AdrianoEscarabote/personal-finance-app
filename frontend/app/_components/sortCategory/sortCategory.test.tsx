import { fireEvent, render, screen } from "@testing-library/react"

import SortCategory from "."

describe("SortCategory", () => {
  it("should render correctly", () => {
    render(<SortCategory setCategory={() => {}} category="" />)
  })

  it("should select a category when clicked", () => {
    const mockSetCategory = jest.fn()
    render(<SortCategory setCategory={mockSetCategory} category="" />)

    const button = screen.getByTestId("sort-category-btn")
    fireEvent.click(button)

    const categoryItem = screen.getByText("Groceries")
    fireEvent.click(categoryItem)

    expect(mockSetCategory).toHaveBeenCalledWith("Groceries")
  })
})
