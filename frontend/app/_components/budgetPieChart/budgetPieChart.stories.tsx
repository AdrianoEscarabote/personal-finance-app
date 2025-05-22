import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import BudgetPieChart from "."

export default {
  title: "components/budgetPieChart",
  component: BudgetPieChart,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
