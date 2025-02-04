import { Meta, StoryObj } from "@storybook/react"
import FinancialSummary from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "components/financialSummary",
  component: FinancialSummary,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
