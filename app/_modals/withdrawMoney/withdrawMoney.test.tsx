import { fireEvent, render, screen } from "@testing-library/react"
import WithdrawMoney from "."
import { legacy_configureStore as configureStore } from "redux-mock-store"
import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])

describe("WithdrawMoney", () => {
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
      <WithdrawMoney
        name="Savings"
        target={2000.0}
        total={159.0}
        closeModal={() => {}}
      />,
    )
  })

  it("should update new amount and progress when amount is entered", () => {
    render(
      <WithdrawMoney
        name="Savings"
        target={2000.0}
        total={159.0}
        closeModal={() => {}}
      />,
    )

    const input = screen.getByTestId("input") as HTMLInputElement
    fireEvent.change(input, { target: { value: "50" } })

    expect(screen.getByText("$109.00")).toBeTruthy()
  })
})
