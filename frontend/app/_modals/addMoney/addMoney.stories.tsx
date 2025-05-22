import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import AddMoney from "."
import { AddMoneyProps } from "./addMoneyProps"

export default {
  title: "modals/addMoney",
  component: AddMoney,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta<AddMoneyProps>

export const Primary: StoryObj = {
  args: {
    name: "Savings",
    target: 2000.0,
    total: 159.0,
    theme: "#277C78",
  },
}
