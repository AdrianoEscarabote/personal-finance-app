import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import ColorTag from "."

const mockStore = configureStore([])

describe("ColorTag Component", () => {
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
        <ColorTag setTheme={() => {}} label="Color Tag" />
      </Provider>,
    )
  })

  it("should toggle color list visibility when the button is clicked", () => {
    render(
      <Provider store={store}>
        <ColorTag setTheme={() => {}} label="Color Tag" />
      </Provider>,
    )

    const toggleButton = screen.getByTestId("color-tag-button")
    fireEvent.click(toggleButton)

    const colorButton = screen.getByTestId("Brown")
    fireEvent.click(colorButton)

    expect(toggleButton.textContent).toContain("Brown")
  })
})
