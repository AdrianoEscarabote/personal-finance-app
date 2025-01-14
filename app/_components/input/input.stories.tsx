import { Meta, StoryObj } from "@storybook/react"
import Input from "."
import { InputProps } from "./InputProps"

export default {
  title: "Input",
  component: Input,
} as Meta<InputProps>

export const Primary: StoryObj = {
  args: {
    label: "Basic Field",
    helperText: "Helper text",
    placeholder: "Placeholder",
  },
}

export const WithIcon: StoryObj = {
  args: {
    label: "Field With Icon",
    helperText: "Helper text",
    placeholder: "Placeholder",
    variant: "withIcon",
  },
}

export const WithPrefix: StoryObj = {
  args: {
    label: "Field With Prefix",
    helperText: "Helper text",
    placeholder: "Placeholder",
    variant: "withPrefix",
  },
}

export const WithColorTag: StoryObj = {
  args: {
    label: "Field With Color Tag",
    helperText: "Helper text",
    placeholder: "Placeholder",
  },
}
