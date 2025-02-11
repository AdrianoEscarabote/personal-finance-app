import { Meta, StoryObj } from "@storybook/react"
import SortCategory from "."
import { SortCategoryProps } from "./sortCategoryProps"

export default {
  title: "components/SortCategory",
  component: SortCategory,
  args: {
    category: "All Transactions",
    setCategory: () => {},
  },
} as Meta<SortCategoryProps>

export const Primary: StoryObj = {}
