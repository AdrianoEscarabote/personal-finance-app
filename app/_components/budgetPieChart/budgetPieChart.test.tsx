import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import BudgetPieChart from "."

const mockStore = configureStore([])

describe("BudgetPieChart", () => {
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
        <BudgetPieChart height={240} width={247} />
      </Provider>,
    )
  })

  it("should display the correct total spent and budget limit", () => {
    render(
      <Provider store={store}>
        <BudgetPieChart height={240} width={247} />
      </Provider>,
    )

    expect(screen.getByText("$1452")).toBeTruthy()
    expect(screen.getByText("of $975 limit")).toBeTruthy()
  })
})
