import { render } from "@testing-library/react"

import { Dialog } from "@/components/ui/dialog"

import DeleteModal from "."

describe("DeleteModal", () => {
  it("should render correctly", () => {
    render(
      <Dialog>
        <DeleteModal
          title="Delete ‘Savings’?"
          description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      </Dialog>,
    )
  })
})
