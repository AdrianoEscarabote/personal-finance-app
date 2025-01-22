import { Meta, StoryObj } from "@storybook/react"
import ColorTag from "."
import { ColorTagProps } from "./colorTagProps"

export default {
  title: "components/ColorTag",
  component: ColorTag,
  args: {
    label: "Color Tag",
  },
} as Meta<ColorTagProps>

export const Primary: StoryObj = {}
