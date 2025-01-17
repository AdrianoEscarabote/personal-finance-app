import { Meta, StoryObj } from "@storybook/react"
import DeleteModal from "."
import { DeleteModalProps } from "./deleteModalProps"

export default {
  title: "modals/DeleteModal",
  component: DeleteModal,
} as Meta<DeleteModalProps>

export const DeleteBudget: StoryObj = {
  args: {
    title: "Delete ‘Entertainment’?",
    description:
      "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirm"),
  },
}

export const DeletePot: StoryObj = {
  args: {
    title: "Delete ‘Savings’?",
    description:
      "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.",
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirm"),
  },
}
