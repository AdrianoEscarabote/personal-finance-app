import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import Budgets from "."
import getMockState from "@/utils/getMockState"
import { legacy_configureStore as configureStore } from "redux-mock-store"

const mockStore = configureStore([])

describe("Budgets", () => {
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
        <Budgets />
      </Provider>,
    )
  })

  it("should display budget categories and values", () => {
    render(
      <Provider store={store}>
        <Budgets />
      </Provider>,
    )

    expect(screen.getByText("Dining Out")).toBeTruthy()
    expect(screen.getByText("$75.00")).toBeTruthy()

    expect(screen.getByText("Entertainment")).toBeTruthy()
    expect(screen.getByText("$50.00")).toBeTruthy()
  })

  it("should render the 'See Details' button", () => {
    render(
      <Provider store={store}>
        <Budgets />
      </Provider>,
    )

    expect(screen.getByText("See Details")).toBeTruthy()
  })
})
