import { Meta, StoryObj } from "@storybook/react"
import EditModal from "."
import { EditModalProps } from "./editModalProps"

export default {
  title: "modals/editModal",
  component: EditModal,
} as Meta<EditModalProps>

export const EditBudget: StoryObj = {
  args: {
    title: "Edit Budget",
    description:
      "As your budgets change, feel free to update your spending limits.",
  },
}

export const EditPot: StoryObj = {
  args: {
    title: "Edit Pot",
    description:
      "If your saving targets change, feel free to update your pots.",
  },
}
