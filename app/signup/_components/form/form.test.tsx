jest.mock("next/navigation")
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

import Form from "."

const mockStore = configureStore([])

import "whatwg-fetch"

// To fix "ReferenceError: fetch is not defined"
import { mockFetch } from "@/utils/mock-fetch"

describe("SignupForm", () => {
  const mockFetchResponse = [{}]
  window.fetch = mockFetch(mockFetchResponse)
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
        <Form />
      </Provider>,
    )
  })

  it("should show required field errors on submit with empty inputs", async () => {
    render(<Form />)
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }))

    expect(await screen.findByText(/Name is required/i)).toBeTruthy()
    expect(await screen.findByText(/This field is required/i)).toBeTruthy()
    expect(await screen.findByText(/Password is required/i)).toBeTruthy()
  })

  it("should show an error message if email is invalid", async () => {
    render(<Form />)
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email" },
    })
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }))

    expect(
      await screen.findByText(/Please enter a valid email address./i),
    ).toBeTruthy()
  })
})
