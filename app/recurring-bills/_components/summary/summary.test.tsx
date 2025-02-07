import { render } from "@testing-library/react"
import Summary from "."
import { legacy_configureStore as configureStore } from "redux-mock-store"
import getMockState from "@/utils/getMockState"
import { Provider } from "react-redux"

const mockStore = configureStore([])

describe("SummaryComponent", () => {
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
        <Summary />
      </Provider>,
    )
  })
})
