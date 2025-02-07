import { Meta, StoryObj } from "@storybook/react"
import Summary from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "recurring-bills/Summary",
  component: Summary,
  decorators: [(Story) => <Provider store={store}>{Story()} </Provider>],
} as Meta

export const Primary: StoryObj = {}
