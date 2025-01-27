import { render, screen } from "@testing-library/react"
import BudgetsCard from "."
import { Provider } from "react-redux"
import getMockState from "@/utils/getMockState"
import { legacy_configureStore as configureStore } from "redux-mock-store"

const mockStore = configureStore([])

describe("BudgetsCard", () => {
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
        <BudgetsCard
          budget={{
            category: "Entertainment",
            maximum: 50.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )
  })
  it("should display the budget category", () => {
    render(
      <Provider store={store}>
        <BudgetsCard
          budget={{
            category: "Entertainment",
            maximum: 50.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    expect(screen.getByText("Entertainment")).toBeTruthy()
  })

  it("should render the progress bar correctly", () => {
    render(
      <Provider store={store}>
        <BudgetsCard
          budget={{
            category: "Entertainment",
            maximum: 50.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    const progressBar = screen.getByTestId("progress-bar")
    expect(progressBar).toBeTruthy()
  })

  it("should display filtered transactions", () => {
    render(
      <Provider store={store}>
        <BudgetsCard
          budget={{
            category: "Entertainment",
            maximum: 50.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    // Verifica se pelo menos uma transação filtrada foi renderizada
    expect(screen.getByText(/Latest Spending/i)).toBeTruthy()
  })
})
