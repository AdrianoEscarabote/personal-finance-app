"use client"
import IconCaretDown from "@/app/_icons/icon-caret-down"
import IconSortMobile from "@/app/_icons/icon-sort-mobile"
import { useIsMobile } from "@/hooks/useIsMobile"

import { SortByProps } from "./sortByProps"
const sortList = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"]

const SortBy = ({
  showSortBy,
  setShowSortBy,
  setSortBy,
  sortBy,
}: SortByProps) => {
  const isMobile = useIsMobile()
  return (
    <div className="relative flex max-w-[170px] items-center gap-2">
      {!isMobile && (
        <span className="text-preset-4 w-12 text-grey-500">Sort by</span>
      )}
      {isMobile ? (
        <button
          onClick={() => setShowSortBy(!showSortBy)}
          className="text-preset-4 flex h-[2.8125rem] items-center justify-center gap-4 rounded-lg px-4 text-grey-900"
        >
          <IconSortMobile className={`text-grey-900 transition-all`} />
        </button>
      ) : (
        <button
          onClick={() => setShowSortBy(!showSortBy)}
          className="text-preset-4 flex h-[2.8125rem] min-w-[7.125rem] items-center justify-center gap-4 rounded-lg border border-beige-500 px-4 text-grey-900"
        >
          {sortBy}
          <IconCaretDown
            className={`text-grey-900 ${showSortBy && "rotate-180"} transition-all`}
          />
        </button>
      )}

      <div
        className={`absolute right-0 top-14 w-[7.125rem] overflow-hidden rounded-lg bg-white px-5 pb-3 shadow-xl transition-all duration-300 ${
          showSortBy
            ? "z-0 max-h-[17.1875rem] opacity-100"
            : "-z-50 max-h-0 opacity-0"
        } `}
        style={{
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <ul>
          {sortList.map((sort, index, arr) => (
            <li key={sort}>
              <button
                className={`${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "border-b border-grey-100 py-3"
                } flex w-full items-center gap-3 text-grey-900 ${sort === sortBy ? "text-preset-4-bold" : "text-preset-4"}`}
                tabIndex={!showSortBy ? -1 : undefined}
                onClick={() => {
                  setShowSortBy(false)
                  setSortBy(sort)
                }}
              >
                {sort}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SortBy
