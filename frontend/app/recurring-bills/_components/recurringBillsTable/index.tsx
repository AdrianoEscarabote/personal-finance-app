"use client"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"

import Input from "@/app/_components/input"
import SortBy from "@/app/_components/sortBy"
import IconBillDue from "@/app/_icons/icon-bill-due"
import IconBillPaid from "@/app/_icons/icon-bill-paid"
import { useIsMobile } from "@/hooks/useIsMobile"
import { RootState, transactions } from "@/redux/reduxTypes"
import getOrdinalSuffix from "@/utils/getOrdinalSuffix"

const RecurringBillsTable = () => {
  const isMobile = useIsMobile()
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

  const getStatusIcon = (daysUntilPayment: number) => {
    if (daysUntilPayment < 0) {
      return <IconBillPaid className="text-green" /> // ✅
    }
    if (daysUntilPayment <= 7) {
      return <IconBillDue className="text-red" /> // ❗
    }
    return null
  }

  return (
    <article className="w-full max-w-[43.6875rem] rounded-xl bg-white px-5 py-6 dark:border dark:border-border dark:bg-grey-950 md:p-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="w-full max-w-[20rem]">
          <Input
            variant="withIcon"
            errors={false}
            placeholder="Search bills"
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

      <div className="grid w-full grid-cols-[2fr_1fr] gap-y-4 md:grid-cols-[20.375rem_11.0625rem_8.1875rem]">
        {!isMobile && (
          <>
            <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-grey-500 dark:border-border dark:text-grey-300">
              Bill Title
            </div>
            <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-grey-500 dark:border-border dark:text-grey-300">
              Due Date
            </div>
            <div className="text-preset-5 mb-1 border-b border-grey-100 pb-6 text-right text-grey-500 dark:border-border dark:text-grey-300">
              Amount
            </div>
          </>
        )}

        {sortedTransactions.length > 0 ? (
          sortedTransactions.slice(0, 8).map((transaction, index, arr) => {
            const today = new Date()
            const paymentDate = new Date(transaction.date)

            const daysUntilPayment = Math.ceil(
              (paymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
            )

            return (
              <div key={transaction.name + index} className="contents">
                <div
                  className={`flex flex-col items-start gap-2 ${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3 dark:border-border"
                  }`}
                >
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src={transaction.avatar}
                      width={32}
                      height={32}
                      alt=""
                      className="rounded-full"
                    />
                    <span className="text-preset-4-bold text-grey-900 dark:text-grey-100">
                      {transaction.name}
                    </span>
                  </div>
                  {isMobile && (
                    <span
                      className={`text-preset-5 flex items-center gap-2 py-0.5 text-green`}
                    >
                      {`Monthly - ${new Date(transaction.date).getDate()}${getOrdinalSuffix(new Date(transaction.date).getDate())}`}
                      {getStatusIcon(daysUntilPayment)}
                    </span>
                  )}
                </div>
                {!isMobile && (
                  <div
                    className={`text-preset-5 flex items-center gap-2 text-green ${
                      index === arr.length - 1
                        ? "pb-0 pt-3"
                        : "border-b border-grey-100 py-3 dark:border-border"
                    }`}
                  >
                    {`Monthly - ${new Date(transaction.date).getDate()}${getOrdinalSuffix(new Date(transaction.date).getDate())}`}
                    {getStatusIcon(daysUntilPayment)}
                  </div>
                )}

                <div
                  className={`text-preset-4-bold ${daysUntilPayment <= 7 && daysUntilPayment > 0 ? "text-red" : "text-grey-900 dark:text-grey-100"} text-right text-grey-900 ${isMobile && "self-end pb-4"} ${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3 dark:border-border"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            )
          })
        ) : (
          <p className="col-span-3 text-center text-grey-500 dark:text-grey-300">
            No results found
          </p>
        )}
      </div>
    </article>
  )
}

export default RecurringBillsTable
