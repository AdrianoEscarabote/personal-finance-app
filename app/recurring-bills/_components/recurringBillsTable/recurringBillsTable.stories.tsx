import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import RecurringBillsTable from "."

export default {
  title: "recurring-bills/RecurringBillsTable",
  component: RecurringBillsTable,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
