import { Meta, StoryObj } from "@storybook/react"
import Budgets from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "components/Budgets",
  component: Budgets,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
