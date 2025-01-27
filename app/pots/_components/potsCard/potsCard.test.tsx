import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import PotsCard from "."
import getMockState from "@/utils/getMockState"
import { legacy_configureStore as configureStore } from "redux-mock-store"

const mockStore = configureStore([])

describe("PotsCard component", () => {
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
        <PotsCard
          pot={{
            name: "Savings",
            target: 2000.0,
            total: 159.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    expect(screen.getByText("Savings")).toBeTruthy()
    expect(screen.getByText("Total Saved:")).toBeTruthy()
    expect(screen.getByText("Target of $2000")).toBeTruthy()
  })

  it("should open and close edit modal", () => {
    render(
      <Provider store={store}>
        <PotsCard
          pot={{
            name: "Savings",
            target: 2000.0,
            total: 159.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId("ellipsis_button"))

    fireEvent.click(screen.getByText("Edit Pot"))

    expect(
      screen.getByText(
        "If your saving targets change, feel free to update your pots.",
      ),
    ).toBeTruthy()

    fireEvent.click(screen.getByTestId("close_modal_button"))

    expect(
      screen.queryByText(
        "If your saving targets change, feel free to update your pots.",
      ),
    ).toBeFalsy()
  })

  it("should open and close delete modal", () => {
    render(
      <Provider store={store}>
        <PotsCard
          pot={{
            name: "Savings",
            target: 2000.0,
            total: 159.0,
            theme: "#277C78",
          }}
        />
      </Provider>,
    )

    fireEvent.click(screen.getByTestId("ellipsis_button"))

    fireEvent.click(screen.getByText("Delete Pot"))

    expect(
      screen.getByText(
        "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.",
      ),
    ).toBeTruthy()

    fireEvent.click(screen.getByText("No, Go Back"))

    expect(
      screen.queryByText("Are you sure you want to delete this pot?"),
    ).toBeFalsy()
  })
})
