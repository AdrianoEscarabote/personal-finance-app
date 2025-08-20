import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import { Dialog } from "@/components/ui/dialog"
import getMockState from "@/utils/getMockState"

import AddMoney from "."

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
      <Dialog>
        <Provider store={store}>
          <AddMoney
            id="add-money-modal"
            name="Savings"
            target={2000.0}
            total={159.0}
            theme="#277C78"
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )
  })

  it("should allow inputting a valid amount", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddMoney
            name="Savings"
            target={2000.0}
            total={159.0}
            theme="#277C78"
            id="add-money-modal"
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    const input = screen.getByLabelText("Amount to Add") as HTMLInputElement
    fireEvent.change(input, { target: { value: "50" } })

    expect(input.value).toBe("50")
  })

  it("should not allow inputting a value greater than the remaining target", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddMoney
            id="add-money-modal"
            name="Savings"
            target={2000.0}
            total={159.0}
            theme="#277C78"
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    const input = screen.getByTestId("amount_input") as HTMLInputElement
    fireEvent.change(input, { target: { value: "5000" } })

    setTimeout(() => {
      expect(input.value).toBe("1841")
    }, 1000)
  })

  it("should dispatch addMoney when submitting with valid data", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddMoney
            id="add-money-modal"
            name="Savings"
            target={2000.0}
            total={159.0}
            theme="#277C78"
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    await userEvent.type(screen.getByTestId("amount_input"), "100")
    await userEvent.click(
      screen.getByRole("button", { name: /confirm addition/i }),
    )

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "financeSlice/addMoney",
        payload: expect.objectContaining({
          pot_name: "Savings",
          new_amount: 100,
        }),
      }),
    )
  })
})
