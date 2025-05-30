import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import WithdrawMoney from "."

export default {
  title: "modals/withdrawMoney",
  component: WithdrawMoney,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  args: {
    name: "Savings",
    target: 2000.0,
    total: 159.0,
    closeModal: () => {},
  },
} as Meta

export const Primary: StoryObj = {}
