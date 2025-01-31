import { Meta, StoryObj } from "@storybook/react"
import SelectCategory from "."
import { SelectCategoryProps } from "./selectCategoryProps"

export default {
  title: "components/SelectCategory",
  component: SelectCategory,
  args: {
    label: "Category",
  },
} as Meta<SelectCategoryProps>

export const Primary: StoryObj = {
  args: {
    label: "Category Label",
  },
}
