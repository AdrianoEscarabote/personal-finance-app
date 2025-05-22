import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import FinancialSummary from "."

const mockStore = configureStore([])

describe("FinancialSummary", () => {
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

  it("should render the financial summary with correct values", () => {
    render(
      <Provider store={store}>
        <FinancialSummary />
      </Provider>,
    )

    expect(screen.getByText("Current Balance")).toBeTruthy()
    expect(screen.getByText("$4,836.00")).toBeTruthy()

    expect(screen.getByText("Income")).toBeTruthy()
    expect(screen.getByText("$3,814.25")).toBeTruthy()

    expect(screen.getByText("Expenses")).toBeTruthy()
    expect(screen.getByText("$1,700.50")).toBeTruthy()
  })
})
