import { render, screen } from "@testing-library/react"

import SortBy from "."

describe("SortBy Component", () => {
  const mockSetShowSortBy = jest.fn()
  const mockSetSortBy = jest.fn()

  const defaultProps = {
    showSortBy: false,
    setShowSortBy: mockSetShowSortBy,
    setSortBy: mockSetSortBy,
    sortBy: "Latest",
  }

  it("should render correctly", () => {
    render(<SortBy {...defaultProps} />)
    expect(screen.getByText("Sort by")).toBeTruthy()
  })
})
