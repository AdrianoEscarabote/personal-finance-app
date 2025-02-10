import { Meta, StoryObj } from "@storybook/react"
import BudgetsSpendingSummary from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "components/BudgetsSpendingSummary",
  component: BudgetsSpendingSummary,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
