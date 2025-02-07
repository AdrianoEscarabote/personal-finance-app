import { render, screen } from "@testing-library/react"
import EditModal from "."
import { legacy_configureStore as configureStore } from "redux-mock-store"
import getMockState from "@/utils/getMockState"
import { Provider } from "react-redux"

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
      <Provider store={store}>
        <EditModal
          content="budget"
          showPotName={false}
          showbudgetCategory={true}
          closeModal={() => {}}
        />
        ,
      </Provider>,
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
      <Provider store={store}>
        <EditModal
          content="budget"
          showPotName={true}
          showbudgetCategory={false}
          closeModal={() => {}}
        />
        ,
      </Provider>,
    )

    expect(screen.getByText("Pot Name")).toBeTruthy()
  })

  it("should always render the Maximum Spend input", () => {
    render(
      <Provider store={store}>
        <EditModal
          content="budget"
          showPotName={false}
          showbudgetCategory={true}
          closeModal={() => {}}
        />
        ,
      </Provider>,
    )

    expect(screen.getByText("Maximum Spend")).toBeTruthy()
  })

  it("should always render the ColorTag component", () => {
    render(
      <Provider store={store}>
        <EditModal
          content="budget"
          showPotName={false}
          showbudgetCategory={true}
          closeModal={() => {}}
        />
      </Provider>,
    )

    expect(screen.getByText("Theme")).toBeTruthy()
  })

  it("should render the close button", () => {
    render(
      <Provider store={store}>
        <EditModal
          content="budget"
          showPotName={false}
          showbudgetCategory={true}
          closeModal={() => {}}
        />
      </Provider>,
    )

    const closeButton = screen.getByRole("button", { name: "" })
    expect(closeButton).toBeTruthy()
  })
})
