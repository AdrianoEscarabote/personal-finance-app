import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import Pots from "."

export default {
  title: "components/Pots",
  component: Pots,
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>
    },
  ],
} as Meta

export const Primary: StoryObj = {}
