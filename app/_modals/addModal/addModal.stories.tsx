import { Meta, StoryObj } from "@storybook/react"
import AddModal from "."
import { addModalProps } from "./addModalProps"
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "modals/addModal",
  component: AddModal,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta<addModalProps>

export const AddNewBudget: StoryObj = {
  args: {
    title: "budget",
    description: "budget",
    textButton: "Add Budget",
    showBudgetCategory: true,
    showPotName: false,
    showMaximumSpend: true,
    showTarget: false,
  },
}

export const AddNewPot: StoryObj = {
  args: {
    title: "pot",
    description: "pot",
    textButton: "Add Pot",
    showBudgetCategory: false,
    showPotName: true,
    showMaximumSpend: false,
    showTarget: true,
  },
}
