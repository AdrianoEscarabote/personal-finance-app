import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])
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

  it("should close modal when clicking outside", () => {
    const closeModal = jest.fn()
    render(
      <Dialog>
        <Provider store={store}>
          <AddTransactionModal closeModal={closeModal} />
        </Provider>
      </Dialog>,
    )

    fireEvent.click(screen.getByTestId("modal-overlay"))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
