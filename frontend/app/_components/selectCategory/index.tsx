import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import IconCaretDown from "@/app/_icons/icon-caret-down"
import { RootState } from "@/redux/reduxTypes"
import { listCategories } from "@/utils/constants"

import { SelectCategoryProps } from "./selectCategoryProps"

const SelectCategory = ({
  label,
  setCategory,
  category,
  dontFilter,
}: SelectCategoryProps) => {
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [showCategory, setShowCategory] = useState<boolean>(false)
  const filteredCategories = listCategories.slice(1)

  const initialCategory = category || filteredCategories[0]
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory)

  const isCategoryUsed = (categoryParam: string) =>
    !dontFilter && budgets.some((budget) => budget.category === categoryParam)

  useEffect(() => {
    let availableCategory = initialCategory

    if (!dontFilter) {
      const firstAvailableCategory = filteredCategories.find(
        (cat) => !budgets.some((budget) => budget.category === cat),
      )

      if (firstAvailableCategory) {
        availableCategory = firstAvailableCategory
      }
    }

    setCategory(availableCategory)
    setSelectedCategory(availableCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgets])

  return (
    <div className="relative max-w-[31rem]">
      <p className="text-preset-5-bold pb-1 text-grey-500 dark:text-gray-300">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setShowCategory(!showCategory)}
        className={`flex h-[2.8125rem] w-full items-center justify-between rounded-lg border border-beige-500 px-5 transition-all dark:border-border dark:bg-grey-950 ${showCategory && "border-grey-900"}`}
        data-testid="select-category-btn"
      >
        <span className="text-preset-4 text-grey-900 dark:text-white">
          {selectedCategory}
        </span>
        <IconCaretDown
          className={`text-grey-900 dark:text-white ${showCategory && "rotate-180"} transition-all`}
        />
      </button>

      <div
        className={`absolute right-0 top-[5rem] z-50 w-full max-w-[31rem] overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 dark:bg-grey-950 ${
          showCategory
            ? "max-h-[18.625rem] overflow-y-scroll opacity-100 scrollbar-thin scrollbar-track-grey-100 scrollbar-thumb-grey-300 dark:scrollbar-track-grey-950 dark:scrollbar-thumb-[#333]"
            : "max-h-0 opacity-0"
        }`}
        style={{
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="px-5 py-3">
          {filteredCategories.map((category, index, arr) => (
            <button
              type="button"
              key={category}
              className={`${
                index === arr.length - 1
                  ? "pb-0 pt-3"
                  : "relative border-b border-border py-3"
              } text-preset-4 flex w-full items-center gap-3 text-grey-900 dark:text-white ${isCategoryUsed(category) ? "cursor-not-allowed opacity-50" : "hover:bg-grey-100 dark:hover:bg-[#1b1b1b]"}`}
              tabIndex={!showCategory ? -1 : undefined}
              onClick={() => {
                setShowCategory(false)
                setSelectedCategory(category)
                setCategory(category)
              }}
              disabled={isCategoryUsed(category)}
            >
              <span className="text-preset-4 text-grey-900 dark:text-white">
                {category}
              </span>
              {isCategoryUsed(category) && (
                <span className="text-preset-5 absolute right-0 text-grey-900 dark:text-white">
                  Already used
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectCategory
