import { render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])
import userEvent from "@testing-library/user-event"

import { Dialog } from "@/components/ui/dialog"

import AddTransactionModal from "."

describe("Add Transaction Modal", () => {
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
          <AddTransactionModal closeModal={() => {}} />
        </Provider>
      </Dialog>,
    )
  })

  it("should show validation errors if required fields are empty", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddTransactionModal closeModal={() => {}} />
        </Provider>
      </Dialog>,
    )
    await userEvent.click(
      screen.getByRole("button", { name: /Add Transaction/i }),
    )
    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(
      2,
    )
  })

  it("should dispatch addTransaction when submitting valid data", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddTransactionModal closeModal={() => {}} />
        </Provider>
      </Dialog>,
    )

    await userEvent.type(screen.getByLabelText(/Name/i), "Test Transaction")
    await userEvent.type(screen.getByLabelText(/Amount/i), "123.45")
    await userEvent.click(
      screen.getByRole("button", { name: /Add Transaction/i }),
    )

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining("addTransaction"),
          payload: expect.objectContaining({
            name: "Test Transaction",
            amount: 123.45,
          }),
        }),
      )
    })
  })

  it("should allow toggling the recurring checkbox", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddTransactionModal closeModal={() => {}} />
        </Provider>
      </Dialog>,
    )
    const checkbox = screen.getByLabelText(/Recurring/i)
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
