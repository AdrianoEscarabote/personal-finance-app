import { useEffect, useState } from "react"

import IconCaretDown from "@/app/_icons/icon-caret-down"
import IconFilterMobile from "@/app/_icons/icon-filter-mobile"
import { useIsMobile } from "@/hooks/useIsMobile"
import { listCategories } from "@/utils/constants"

import { SortCategoryProps } from "./sortCategoryProps"

const SortCategory = ({ category, setCategory }: SortCategoryProps) => {
  const isMobile = useIsMobile()
  const [showCategory, setShowCategory] = useState<boolean>(false)

  const [selectedCategory, setSelectedCategory] = useState<string>(category)

  useEffect(() => {
    setCategory(category)
    setSelectedCategory(category)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex w-full items-center gap-4 md:max-w-[15.3125rem]">
      {!isMobile && (
        <p className="text-preset-4 text-grey-500 dark:text-grey-300">
          Category
        </p>
      )}
      {isMobile ? (
        <button
          type="button"
          onClick={() => setShowCategory(!showCategory)}
          className={`flex h-[2.8125rem] w-[2.8125rem] items-center justify-center rounded-lg transition-all`}
          data-testid="sort-category-btn"
        >
          <IconFilterMobile className={`text-grey-900`} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setShowCategory(!showCategory)}
          className={`flex h-[2.8125rem] w-full items-center justify-between rounded-lg border border-beige-500 px-5 transition-all dark:border-border dark:bg-grey-975 dark:text-grey-100 ${showCategory && "border-grey-900"}`}
          data-testid="sort-category-btn"
        >
          <span className="text-preset-4 text-grey-900 dark:text-grey-100">
            {selectedCategory}
          </span>
          <IconCaretDown
            className={`text-grey-900 dark:text-grey-100 ${showCategory && "rotate-180"} transition-all`}
          />
        </button>
      )}

      <div
        className={`absolute right-0 top-[3.25rem] z-50 w-full overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 dark:border dark:border-border dark:bg-grey-975 ${
          showCategory
            ? "max-h-[18.625rem] overflow-y-scroll opacity-100 scrollbar-thin scrollbar-track-grey-100 scrollbar-thumb-grey-300 dark:scrollbar-track-[#171717] dark:scrollbar-thumb-[#333]"
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
                    : "relative border-b border-grey-100 py-3 dark:border-border"
                } flex w-full items-center gap-3`}
                tabIndex={!showCategory ? -1 : undefined}
                onClick={() => {
                  setShowCategory(false)
                  setSelectedCategory(category)
                  setCategory(category)
                }}
              >
                <span
                  className={`text-grey-900 dark:text-grey-100 ${category === selectedCategory ? "text-preset-4-bold" : "text-preset-4"}`}
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
