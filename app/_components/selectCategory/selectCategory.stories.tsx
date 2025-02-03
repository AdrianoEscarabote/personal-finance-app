import { Meta, StoryObj } from "@storybook/react"
import SelectCategory from "."
import { SelectCategoryProps } from "./selectCategoryProps"
import store from "@/.storybook/storybook-store"
import { Provider } from "react-redux"

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
