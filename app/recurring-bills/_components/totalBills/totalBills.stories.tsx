import { Meta, StoryObj } from "@storybook/react"
import TotalBills from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "recurring-bills/TotalBills",
  component: TotalBills,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
