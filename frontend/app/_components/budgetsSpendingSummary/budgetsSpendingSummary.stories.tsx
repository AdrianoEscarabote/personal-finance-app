import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import BudgetsSpendingSummary from "."

export default {
  title: "components/BudgetsSpendingSummary",
  component: BudgetsSpendingSummary,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
