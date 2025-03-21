import { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"

import store from "@/.storybook/storybook-store"

import SelectCategory from "."
import { SelectCategoryProps } from "./selectCategoryProps"

export default {
  title: "components/SelectCategory",
  component: SelectCategory,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
  args: {
    label: "Category",
  },
} as Meta<SelectCategoryProps>

export const Primary: StoryObj = {
  args: {
    label: "Category Label",
  },
}
