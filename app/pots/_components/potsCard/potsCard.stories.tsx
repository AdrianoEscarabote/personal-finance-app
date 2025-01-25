import { Meta, StoryObj } from "@storybook/react"
import PotsCard from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "pots/PotsCard",
  component: PotsCard,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
} as Meta

export const Primary: StoryObj = {}
