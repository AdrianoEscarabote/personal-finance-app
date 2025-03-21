import { Meta, StoryObj } from "@storybook/react"

import Button from "."
import { ButtonProps } from "./ButtonProps"

export default {
  title: "components/Button",
  component: Button,
  args: {},
} as Meta<ButtonProps>

export const Primary: StoryObj = {
  args: {
    variant: "primary",
    label: "Placeholder",
  },
}

export const Secondary: StoryObj = {
  args: {
    variant: "secondary",
    label: "Placeholder",
  },
}

export const Tertiary: StoryObj = {
  args: {
    variant: "tertiary",
    label: "Placeholder",
  },
}

export const Destroy: StoryObj = {
  args: {
    variant: "destroy",
    label: "Placeholder",
  },
}
