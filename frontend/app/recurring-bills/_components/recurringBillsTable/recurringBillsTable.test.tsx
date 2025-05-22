import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import RecurringBillsTable from "."
const mockStore = configureStore([])

describe("RecurringBillsTable", () => {
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
        <RecurringBillsTable />
      </Provider>,
    )
  })

  it("should display table headers", () => {
    render(
      <Provider store={store}>
        <RecurringBillsTable />
      </Provider>,
    )

    expect(screen.getByText("Bill Title")).toBeTruthy()
    expect(screen.getByText("Due Date")).toBeTruthy()
    expect(screen.getByText("Amount")).toBeTruthy()
  })

  it("should filter transactions based on search input", () => {
    render(
      <Provider store={store}>
        <RecurringBillsTable />
      </Provider>,
    )

    const searchInput = screen.getByTestId("search_input")
    fireEvent.change(searchInput, { target: { value: "Pixel Playground" } })

    expect(screen.getByText("Pixel Playground")).toBeTruthy()
    expect(screen.queryByText("Spotify")).not.toBeTruthy()
  })

  it("should show 'No results found' when search returns no matches", () => {
    render(
      <Provider store={store}>
        <RecurringBillsTable />
      </Provider>,
    )

    const searchInput = screen.getByTestId("search_input")
    fireEvent.change(searchInput, { target: { value: "Inexistente" } })

    expect(screen.getByText("No results found")).toBeTruthy()
  })
})
