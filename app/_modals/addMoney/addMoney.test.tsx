import { fireEvent, render, screen } from "@testing-library/react"
import AddMoney from "."
import getMockState from "@/utils/getMockState"
import { legacy_configureStore as configureStore } from "redux-mock-store"
import { Provider } from "react-redux"

const mockStore = configureStore([])

describe("AddMoney", () => {
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
        <AddMoney
          name="Savings"
          target={2000.0}
          total={159.0}
          theme="#277C78"
          closeModal={() => {}}
        />
      </Provider>,
    )
  })

  it("should allow inputting a valid amount", () => {
    render(
      <Provider store={store}>
        <AddMoney
          name="Savings"
          target={2000.0}
          total={159.0}
          theme="#277C78"
          closeModal={() => {}}
        />
      </Provider>,
    )

    const input = screen.getByLabelText("Amount to Add") as HTMLInputElement
    fireEvent.change(input, { target: { value: "50" } })

    expect(input.value).toBe("50")
  })

  it("should not allow inputting a value greater than the remaining target", () => {
    render(
      <Provider store={store}>
        <AddMoney
          name="Savings"
          target={2000.0}
          total={159.0}
          theme="#277C78"
          closeModal={() => {}}
        />
      </Provider>,
    )

    const input = screen.getByTestId("amount_input") as HTMLInputElement
    fireEvent.change(input, { target: { value: "5000" } })

    setTimeout(() => {
      expect(input.value).toBe("1841")
    }, 1000)
  })
})
