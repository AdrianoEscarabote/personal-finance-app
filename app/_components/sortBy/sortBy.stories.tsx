import { Meta, StoryObj } from "@storybook/react"
import SortBy from "."
import { SortByProps } from "./sortByProps"

export default {
  title: "components/sortBy",
  component: SortBy,
  args: {
    sortBy: "Latest",
    showSortBy: false,
  },
} as Meta<SortByProps>

export const Closed: StoryObj = {}

export const Open: StoryObj = {
  args: {
    sortBy: "Latest",
    showSortBy: true,
  },
}
