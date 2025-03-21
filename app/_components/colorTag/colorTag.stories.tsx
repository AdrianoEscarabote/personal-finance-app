import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import ColorTag from "."
import { ColorTagProps } from "./colorTagProps"

export default {
  title: "components/ColorTag",
  component: ColorTag,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  args: {
    label: "Color Tag",
    setTheme: () => {},
  },
} as Meta<ColorTagProps>

export const Primary: StoryObj = {}
