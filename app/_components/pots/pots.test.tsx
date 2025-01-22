import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"
import Pots from "."
import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])

describe("Pots Component", () => {
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
        <Pots />
      </Provider>,
    )

    expect(screen.getByText("Pots")).toBeTruthy()

    expect(screen.getByRole("link", { name: "See Details" })).toBeTruthy()

    expect(screen.getByText("Total Saved")).toBeTruthy()
    expect(screen.getByText("$920")).toBeTruthy()

    expect(screen.getByText("Savings")).toBeTruthy()
    expect(screen.getByText("$159")).toBeTruthy()
    expect(screen.getByText("New Laptop")).toBeTruthy()
    expect(screen.getByText("$10")).toBeTruthy()
  })

  it("should display a maximum of 4 pots", () => {
    render(
      <Provider store={store}>
        <Pots />
      </Provider>,
    )

    const potNames = screen.getAllByText(/\$[0-9]+/)
    expect(potNames).toHaveLength(5)
  })
})
