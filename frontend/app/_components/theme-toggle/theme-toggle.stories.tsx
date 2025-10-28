import { Meta, StoryObj } from "@storybook/react"

import ThemeToggle from "."

export default {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  args: {
    isMinimized: false,
    setIsMinimized: () => {},
  },
} as Meta

export const Default: StoryObj = {}
