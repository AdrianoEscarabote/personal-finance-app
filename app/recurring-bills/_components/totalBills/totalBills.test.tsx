import { render, screen } from "@testing-library/react"
import TotalBills from "."
import getMockState from "@/utils/getMockState"
import { legacy_configureStore as configureStore } from "redux-mock-store"
import { Provider } from "react-redux"

const mockStore = configureStore([])

describe("TotalBillsComponent", () => {
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
        <TotalBills />
      </Provider>,
    )
  })

  it("should display the correct total amount", () => {
    render(
      <Provider store={store}>
        <TotalBills />
      </Provider>,
    )

    expect(screen.getByText("$1124.98")).toBeTruthy()
  })
})
