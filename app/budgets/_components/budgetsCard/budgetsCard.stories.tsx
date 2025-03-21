import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import BudgetsCard from "."
import { BudgetsCardProps } from "./budgetsCardProps"

export default {
  title: "budgets/BudgetsCard",
  component: BudgetsCard,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  args: {
    budget: {
      category: "Entertainment",
      maximum: 50.0,
      theme: "#277C78",
      budget_id: "1",
    },
  },
} as Meta<BudgetsCardProps>

export const Primary: StoryObj = {}
