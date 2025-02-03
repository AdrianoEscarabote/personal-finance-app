import { Meta, StoryObj } from "@storybook/react"
import ColorTag from "."
import { ColorTagProps } from "./colorTagProps"
import { Provider } from "react-redux"
import store from "@/.storybook/storybook-store"

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
