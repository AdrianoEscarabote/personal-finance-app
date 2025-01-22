import { render, screen } from "@testing-library/react"
import Transactions from "."
import { legacy_configureStore as configureStore } from "redux-mock-store"
import getMockState from "@/utils/getMockState"
import { Provider } from "react-redux"

const mockStore = configureStore([])

describe("Transactions Component", () => {
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
        <Transactions />
      </Provider>,
    )

    expect(screen.getByText("Transactions")).toBeTruthy()

    expect(screen.getByText("View All")).toBeTruthy()
  })
  it("should display transactions from the state", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>,
    )

    expect(screen.getByText("Emma Richardson")).toBeTruthy()
    expect(screen.getByText("Savory Bites Bistro")).toBeTruthy()
    expect(screen.getByText("Daniel Carter")).toBeTruthy()

    expect(screen.getByText("+$75.50")).toBeTruthy()
    expect(screen.getByText("-$55.50")).toBeTruthy()
    expect(screen.getByText("-$42.30")).toBeTruthy()
  })
})
