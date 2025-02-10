import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import BudgetsSpendingSummary from "."
import { legacy_configureStore as configureStore } from "redux-mock-store"
import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])

describe("BudgetsSpendingSummary", () => {
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
        <BudgetsSpendingSummary />
      </Provider>,
    )
  })

  it("should render budget categories and transactions correctly", () => {
    render(
      <Provider store={store}>
        <BudgetsSpendingSummary />
      </Provider>,
    )

    expect(screen.getByText("Entertainment")).toBeTruthy()
    expect(screen.getByText("Dining Out")).toBeTruthy()
    expect(screen.getByText("$25")).toBeTruthy()
    expect(screen.getByText("$490.49")).toBeTruthy()
  })
})
