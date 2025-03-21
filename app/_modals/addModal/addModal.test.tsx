import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

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
      </Provider>,
    )
  })
  it("should display the Pot Name input when showPotName is true", () => {
    render(
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
      </Provider>,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should not display the Pot Name input when showPotName is false", () => {
    render(
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
      </Provider>,
    )

    expect(screen.queryByLabelText("Pot Name")).toBeFalsy()
  })

  it("should display the Budget Category dropdown when showBudgetCategory is true", () => {
    render(
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
      </Provider>,
    )

    expect(screen.getByText("Budget Category")).toBeTruthy()
  })

  it("should display the ColorTag component", () => {
    render(
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
        ,
      </Provider>,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })
})
