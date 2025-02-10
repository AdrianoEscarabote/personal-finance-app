"use client"
import Input from "@/app/_components/input"
import SortBy from "@/app/_components/sortBy"
import { RootState, transactions } from "@/redux/reduxTypes"
import getOrdinalSuffix from "@/utils/getOrdinalSuffix"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"

const RecurringBillsTable = () => {
  const { transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [showSortBy, setShowSortBy] = useState(false)
  const [sortBy, setSortBy] = useState<string>("Latest")
  const [search, setSearch] = useState<string>("")

  const filteredTransactions = transactions
    .filter((transaction) => transaction.recurring === true)
    .filter((transaction) =>
      transaction.name
        .trim()
        .toLowerCase()
        .startsWith(search.trim().toLowerCase()),
    )

  const sortTransactions = (transactions: transactions[], sortBy: string) => {
    return [...transactions].sort((a, b) => {
      if (sortBy === "Latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortBy === "Oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      if (sortBy === "Highest") {
        return a.amount - b.amount
      }
      if (sortBy === "Lowest") {
        return b.amount - a.amount
      }
      if (sortBy === "A to Z") {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === "Z to A") {
        return b.name.localeCompare(a.name)
      }
      return 0
    })
  }

  const sortedTransactions = sortTransactions(filteredTransactions, sortBy)

  return (
    <article className="w-[43.6875rem] rounded-xl bg-white p-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="w-full max-w-[20rem]">
          <Input
            variant="withIcon"
            errors={false}
            id="search"
            name="search"
            label=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="search_input"
          />
        </div>

        <SortBy
          setSortBy={setSortBy}
          sortBy={sortBy}
          showSortBy={showSortBy}
          setShowSortBy={setShowSortBy}
        />
      </div>

      <div className="grid w-full grid-cols-[20.375rem_11.0625rem_8.1875rem] gap-y-4">
        <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-grey-500">
          Bill Title
        </div>
        <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-grey-500">
          Due Date
        </div>
        <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-right text-grey-500">
          Amount
        </div>

        {sortedTransactions.length > 0 ? (
          sortedTransactions.slice(0, 8).map((transaction, index, arr) => {
            return (
              <div key={transaction.name + index} className="contents">
                <div
                  className={`flex items-center gap-4 ${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3"
                  }`}
                >
                  <Image
                    src={transaction.avatar}
                    width={32}
                    height={32}
                    alt=""
                    className="rounded-full"
                  />
                  <span className="text-preset-4-bold text-grey-900">
                    {transaction.name}
                  </span>
                </div>
                <div
                  className={`${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3"
                  }`}
                >
                  {`Monthly - ${new Date(transaction.date).getDate()}${getOrdinalSuffix(new Date(transaction.date).getDate())}`}
                </div>
                <div
                  className={`text-preset-4-bold text-right text-grey-900 ${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            )
          })
        ) : (
          <p className="col-span-3 text-center text-grey-500">
            No results found
          </p>
        )}
      </div>
    </article>
  )
}

export default RecurringBillsTable
