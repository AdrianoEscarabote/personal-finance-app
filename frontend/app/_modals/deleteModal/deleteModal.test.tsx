import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

  it("should call onCancel when cancel button is clicked", async () => {
    const onCancel = jest.fn()
    render(
      <Dialog>
        <DeleteModal
          title="Savings"
          description="Are you sure?"
          onCancel={onCancel}
          onConfirm={() => {}}
        />
      </Dialog>,
    )
    await userEvent.click(screen.getByTestId("delete-modal-cancel-button"))
    expect(onCancel).toHaveBeenCalled()
  })

  it("should call onConfirm when confirm button is clicked", async () => {
    const onConfirm = jest.fn()
    render(
      <Dialog>
        <DeleteModal
          title="Savings"
          description="Are you sure?"
          onCancel={() => {}}
          onConfirm={onConfirm}
        />
      </Dialog>,
    )

    await userEvent.click(screen.getByTestId("confirm-modal-delete-button"))
    expect(onConfirm).toHaveBeenCalled()
  })
})
