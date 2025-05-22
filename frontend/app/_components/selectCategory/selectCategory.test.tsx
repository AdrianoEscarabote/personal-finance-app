import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import SelectCategory from "."

const mockStore = configureStore([])

describe("SelectCategory", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any

  beforeEach(() => {
    const mockState = getMockState()
    const state = mockStore(mockState)

    store = state
    store.dispatch = jest.fn()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <SelectCategory label="Category" setCategory={() => {}} />
      </Provider>,
    )
  })

  it("should update the selected category when an option is clicked", () => {
    const setCategoryMock = jest.fn()
    render(
      <Provider store={store}>
        <SelectCategory label="Category" setCategory={setCategoryMock} />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId("select-category-btn"))
    fireEvent.click(screen.getByText("Transportation"))

    expect(screen.getAllByText("Transportation")).toBeTruthy()
    expect(setCategoryMock).toHaveBeenCalledWith("Transportation")
  })
})
