import { Meta, StoryObj } from "@storybook/react"
import AddModal from "."
import { addModalProps } from "./addModalProps"

export default {
  title: "modals/addModal",
  component: AddModal,
} as Meta<addModalProps>

export const AddNewBudget: StoryObj = {
  args: {
    title: "Add New Budget",
    description:
      "Choose a category to set a spending budget. These categories can help you monitor spending.",
    textButton: "Add Budget",
    showBudgetCategory: true,
    showPotName: false,
    showMaximumSpend: true,
    showTarget: false,
  },
}

export const AddNewPot: StoryObj = {
  args: {
    title: "Add New Pot",
    description:
      "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
    textButton: "Add Pot",
    showBudgetCategory: false,
    showPotName: true,
    showMaximumSpend: false,
    showTarget: true,
  },
}
