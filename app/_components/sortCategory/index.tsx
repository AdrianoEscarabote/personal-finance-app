import { useEffect, useState } from "react"
import { SortCategoryProps } from "./sortCategoryProps"
import IconCaretDown from "@/app/_icons/icon-caret-down"
import { listCategories } from "@/utils/constants"

const SortCategory = ({ category, setCategory }: SortCategoryProps) => {
  const [showCategory, setShowCategory] = useState<boolean>(false)

  const [selectedCategory, setSelectedCategory] = useState<string>(category)

  useEffect(() => {
    setCategory(category)
    setSelectedCategory(category)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex w-full max-w-[245px] items-center gap-4">
      <p className="text-preset-4 text-grey-500">Category</p>

      <button
        type="button"
        onClick={() => setShowCategory(!showCategory)}
        className={`flex h-[2.8125rem] w-full items-center justify-between rounded-lg border border-beige-500 px-5 transition-all ${showCategory && "border-grey-900"}`}
        data-testid="sort-category-btn"
      >
        <span className="text-preset-4 text-grey-900">{selectedCategory}</span>
        <IconCaretDown
          className={`text-grey-900 ${showCategory && "rotate-180"} transition-all`}
        />
      </button>

      <div
        className={`absolute right-0 top-[5rem] z-50 w-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
          showCategory
            ? "max-h-[18.625rem] overflow-y-scroll opacity-100 scrollbar-thin scrollbar-track-grey-100 scrollbar-thumb-grey-300"
            : "max-h-0 opacity-0"
        }`}
        style={{
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <ul className="px-5 py-3">
          {listCategories.map((category, index, arr) => (
            <li key={category}>
              <button
                type="button"
                className={`${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "relative border-b border-grey-100 py-3"
                } flex w-full items-center gap-3`}
                tabIndex={!showCategory ? -1 : undefined}
                onClick={() => {
                  setShowCategory(false)
                  setSelectedCategory(category)
                  setCategory(category)
                }}
              >
                <span
                  className={`text-grey-900 ${category === selectedCategory ? "text-preset-4-bold" : "text-preset-4"}`}
                >
                  {category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SortCategory
