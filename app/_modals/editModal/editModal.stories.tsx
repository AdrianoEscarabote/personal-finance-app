import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import EditModal from "."
import { EditModalProps } from "./editModalProps"

export default {
  title: "modals/editModal",
  component: EditModal,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta<EditModalProps>

export const EditBudget: StoryObj = {
  args: {
    content: "budget",
    showPotName: false,
    showbudgetCategory: true,
  },
}

export const EditPot: StoryObj = {
  args: {
    content: "pot",
    showPotName: true,
    showbudgetCategory: false,
  },
}
