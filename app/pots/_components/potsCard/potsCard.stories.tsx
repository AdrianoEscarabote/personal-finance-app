import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import PotsCard from "."
import { PotsCardProps } from "./potsCardProps"

export default {
  title: "pots/PotsCard",
  component: PotsCard,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  args: {
    pot: {
      name: "Savings",
      target: 2000.0,
      total: 159.0,
      theme: "#277C78",
    },
  },
} as Meta<PotsCardProps>

export const Primary: StoryObj = {}
