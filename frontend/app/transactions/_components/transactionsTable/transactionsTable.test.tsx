import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import TransactionsTable from "."

const mockStore = configureStore([])

describe("transactionsTable", () => {
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
        <TransactionsTable />
      </Provider>,
    )
  })

  it("renders transaction categories", () => {
    render(
      <Provider store={store}>
        <TransactionsTable />
      </Provider>,
    )

    expect(screen.getAllByText("Groceries")).toBeTruthy()
    expect(screen.getByText("Transportation")).toBeTruthy()
  })

  it("filters transactions based on search input", () => {
    render(
      <Provider store={store}>
        <TransactionsTable />
      </Provider>,
    )
    const searchInput = screen.getByPlaceholderText("Search transaction")
    fireEvent.change(searchInput, { target: { value: "Aqua Flow Utilities" } })

    expect(screen.getByText("Aqua Flow Utilities")).toBeTruthy()
    expect(screen.queryByText("John Doe")).toBeFalsy()
  })
})
