import { Meta, StoryObj } from "@storybook/react"
import RecurringBills from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "components/RecurringBills",
  component: RecurringBills,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
