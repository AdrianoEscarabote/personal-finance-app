import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import LogoutButton from "."

export default {
  title: "components/LogoutButton",
  component: LogoutButton,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta

export const Primary: StoryObj = {}
