import { Meta, StoryObj } from "@storybook/react"
import Pots from "."
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

export default {
  title: "Pots",
  component: Pots,
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>
    },
  ],
} as Meta

export const Primary: StoryObj = {}
