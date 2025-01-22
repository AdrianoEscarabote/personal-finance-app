import { Meta, StoryObj } from "@storybook/react"
import Transactions from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "Transactions",
  component: Transactions,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
