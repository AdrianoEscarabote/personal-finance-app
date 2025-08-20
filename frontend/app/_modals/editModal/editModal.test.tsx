import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import { Dialog } from "@/components/ui/dialog"
import getMockState from "@/utils/getMockState"

import EditModal from "."

const mockStore = configureStore([])

describe("EditModal", () => {
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

  it("should render correctly with default props", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="budget"
            showPotName={false}
            showbudgetCategory={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Edit Budget")).toBeTruthy()
    expect(
      screen.getByText(
        "As your budgets change, feel free to update your spending limits.",
      ),
    ).toBeTruthy()
    expect(screen.getByRole("button", { name: "Save Changes" })).toBeTruthy()
  })

  it("should render the Pot Name input when showPotName is true", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="pot"
            showPotName={true}
            showbudgetCategory={false}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should always render the Maximum Spend input", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="budget"
            showPotName={false}
            showbudgetCategory={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Maximum Spend")).toBeTruthy()
  })

  it("should always render the ColorTag component", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="budget"
            showPotName={false}
            showbudgetCategory={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })

  it("should dispatch editPot when submitting valid data", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="pot"
            showPotName={true}
            data_edit_pot={{
              pot_id: "1",
              pot_name: "Pot Name",
              target: 1000,
              theme: "#277C78",
            }}
            showbudgetCategory={false}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    const potNameInput = screen.getByTestId("input-pot-name")
    const maximumInput = screen.getByTestId("input-maximum")

    await userEvent.clear(potNameInput)
    await userEvent.type(potNameInput, "New Pot Name")

    await userEvent.clear(maximumInput)
    await userEvent.type(maximumInput, "1000")

    await userEvent.click(screen.getByRole("button", { name: "Save Changes" }))

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "financeSlice/editPot",
        payload: {
          pot_name: "Pot Name",
          new_pot_name: "New Pot Name",
          maximum_spend: "1000",
          theme: "#277C78",
        },
      }),
    )
  })

  it("should dispatch editBudget when submitting valid data", async () => {
    render(
      <Dialog>
        <Provider store={store}>
          <EditModal
            content="budget"
            showPotName={false}
            data_edit_budget={{
              budget_id: "1",
              budget_category: "Entertainment",
              target: 1000,
              theme: "#277C78",
            }}
            showbudgetCategory={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    await userEvent.click(screen.getByTestId("select-category-btn"))
    await userEvent.click(screen.getByText("Bills"))

    const maximumInput = screen.getByTestId("input-maximum")
    await userEvent.clear(maximumInput)
    await userEvent.type(maximumInput, "1000")

    await userEvent.click(screen.getByRole("button", { name: "Save Changes" }))

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "financeSlice/editBudget",
        payload: {
          category: "Entertainment",
          new_category: "Bills",
          maximum: 1000,
          theme: "#277C78",
        },
      }),
    )
  })
})
