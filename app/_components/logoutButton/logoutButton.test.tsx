jest.mock("next/navigation")
import { render } from "@testing-library/react"

import LogoutButton from "."

describe("Logout Button", () => {
  it("should render correctly", () => {
    render(<LogoutButton />)
  })
})
