import IconCaretDown from "@/app/_icons/icon-caret-down"
import { useEffect, useState } from "react"
import { SelectCategoryProps } from "./selectCategoryProps"
import { listCategories } from "@/utils/constants"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/reduxTypes"

const SelectCategory = ({ label, setCategory }: SelectCategoryProps) => {
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [showColors, setShowColors] = useState<boolean>(false)
  const filteredCategories = listCategories.slice(1)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filteredCategories[0],
  )

  const isCategoryUsed = (category: string) =>
    budgets.some((budget) => budget.category === category)

  useEffect(() => {
    setCategory(selectedCategory)
    if (isCategoryUsed(selectedCategory)) {
      const availableCategory = filteredCategories.find(
        (category) => !isCategoryUsed(category),
      )

      if (availableCategory) {
        setSelectedCategory(availableCategory)
        setCategory(availableCategory)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative max-w-[31rem]">
      <p className="text-preset-5-bold pb-1 text-grey-500">{label}</p>

      <button
        type="button"
        onClick={() => setShowColors(!showColors)}
        className={`flex h-[2.8125rem] w-full items-center justify-between rounded-lg border border-beige-500 px-5 transition-all ${showColors && "border-grey-900"}`}
        data-testid="select-category-btn"
      >
        <span className="text-preset-4 text-grey-900">{selectedCategory}</span>
        <IconCaretDown
          className={`text-grey-900 ${showColors && "rotate-180"} transition-all`}
        />
      </button>

      <div
        className={`absolute right-0 top-[5rem] z-50 w-full max-w-[31rem] overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
          showColors
            ? "max-h-[18.625rem] overflow-y-scroll opacity-100 scrollbar-thin scrollbar-track-grey-100 scrollbar-thumb-grey-300"
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
                  : "relative border-b border-grey-100 py-3"
              } text-preset-4 flex w-full items-center gap-3 text-grey-900 ${isCategoryUsed(category) ? "cursor-not-allowed opacity-50" : ""}`}
              tabIndex={!showColors ? -1 : undefined}
              onClick={() => {
                setShowColors(false)
                setSelectedCategory(category)
                setCategory(category)
              }}
              disabled={isCategoryUsed(category)}
            >
              <span className="text-preset-4 text-grey-900">{category}</span>
              {isCategoryUsed(category) && (
                <span className="text-preset-5 absolute right-0 text-grey-900">
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
