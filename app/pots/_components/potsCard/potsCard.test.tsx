import { render } from "@testing-library/react"
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
        <PotsCard />
      </Provider>,
    )
  })
})
