import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import { Dialog } from "@/components/ui/dialog"
import getMockState from "@/utils/getMockState"

import WithdrawMoney from "."

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
      <Dialog>
        <Provider store={store}>
          <WithdrawMoney
            id="withdraw-1"
            name="Savings"
            target={2000.0}
            total={159.0}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )
  })

  it("should update new amount and progress when amount is entered", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <WithdrawMoney
            id="withdraw-1"
            name="Savings"
            target={2000.0}
            total={159.0}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    const input = screen.getByTestId("input") as HTMLInputElement
    fireEvent.change(input, { target: { value: "50" } })

    expect(screen.getByText("$109.00")).toBeTruthy()
  })

  it("should dispatch withdrawMoney when submitting valid data", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <WithdrawMoney
            id="withdraw-1"
            name="Savings"
            target={2000.0}
            total={159.0}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    await userEvent.type(screen.getByTestId("input"), "50")
    await userEvent.click(
      screen.getByRole("button", { name: /Confirm Withdrawal/i }),
    )

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "financeSlice/withdrawMoney",
        payload: {
          pot_name: "Savings",
          withdraw_amount: 50,
        },
      }),
    )
  })
})
