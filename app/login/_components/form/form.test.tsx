jest.mock("next/navigation")
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { legacy_configureStore as configureStore } from "redux-mock-store"

import getMockState from "@/utils/getMockState"

const mockStore = configureStore([])

import "whatwg-fetch"

// To fix "ReferenceError: fetch is not defined"
import { mockFetch } from "@/utils/mock-fetch"

import Form from "."

describe("LoginForm", () => {
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

  it("should display required error when fields are empty", async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>,
    )

    fireEvent.click(await screen.findByRole("button", { name: /Login/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeTruthy()
      expect(screen.getByText(/password is required/i)).toBeTruthy()
    })
  })

  it("should show validation message for invalid email format", async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>,
    )

    fireEvent.input(await screen.findByLabelText(/email/i), {
      target: { value: "invalid-email" },
    })
    fireEvent.click(screen.getByRole("button", { name: /Login/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address./i),
      ).toBeTruthy()
    })
  })
})
