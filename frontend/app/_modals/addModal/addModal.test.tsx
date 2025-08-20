import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import { Dialog } from "@/components/ui/dialog"
import getMockState from "@/utils/getMockState"

import AddModal from "."

const mockStore = configureStore([])

describe("AddModal", () => {
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
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showPotName={true}
            showMaximumSpend={false}
            showBudgetCategory={false}
            showTarget={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )
  })
  it("should display the Pot Name input when showPotName is true", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showPotName={true}
            showMaximumSpend={false}
            showBudgetCategory={false}
            showTarget={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should not display the Pot Name input when showPotName is false", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showPotName={false}
            showMaximumSpend={false}
            showBudgetCategory={false}
            showTarget={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.queryByLabelText("Pot Name")).toBeFalsy()
  })

  it("should display the Budget Category dropdown when showBudgetCategory is true", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showBudgetCategory={true}
            showPotName={false}
            showMaximumSpend={false}
            showTarget={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Budget Category")).toBeTruthy()
  })

  it("should display the ColorTag component", () => {
    render(
      <Dialog>
        <Provider store={store}>
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showBudgetCategory={true}
            showPotName={false}
            showMaximumSpend={false}
            showTarget={true}
            closeModal={() => {}}
          />
        </Provider>
      </Dialog>,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })
})
