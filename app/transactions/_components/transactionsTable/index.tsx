"use client"

import Input from "@/app/_components/input"
import SortBy from "@/app/_components/sortBy"
import SortCategory from "@/app/_components/sortCategory"
import IconCaretLeft from "@/app/_icons/icon-caret-left"
import IconCaretRight from "@/app/_icons/icon-caret-right"
import { RootState, transactions } from "@/redux/reduxTypes"
import { formatDate } from "@/utils/formatDate"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"

const TransactionsTable = () => {
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("All Transactions")
  const [showSortBy, setShowSortBy] = useState(false)
  const [sortBy, setSortBy] = useState<string>("Latest")

  const { transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )

  const itemsPerPage = 10

  const [currentPage, setCurrentPage] = useState(1)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name
      .trim()
      .toLowerCase()
      .startsWith(search.trim().toLowerCase())

    if (category === "All Transactions") {
      return matchesSearch
    }
    const matchesCategory = category ? transaction.category === category : true

    return matchesSearch && matchesCategory
  })

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

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <article className="w-full max-w-[66.25rem] rounded-xl bg-white p-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="w-full max-w-[20rem]">
          <Input
            variant="withIcon"
            errors={false}
            id="search"
            name="search"
            label=""
            placeholder="Search transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="z-50 flex w-full max-w-[438px] items-center gap-4">
          <SortBy
            setSortBy={setSortBy}
            sortBy={sortBy}
            showSortBy={showSortBy}
            setShowSortBy={setShowSortBy}
          />
          <SortCategory category={category} setCategory={setCategory} />
        </div>
      </div>
      <div className="mb-6 grid grid-cols-4 gap-0">
        <div>
          <p className="text-preset-5 mb-3 border-b border-grey-100 pb-3 text-grey-500">
            Recipient / Sender
          </p>
          {paginatedTransactions.map((transaction, index, arr) => (
            <div
              key={`Sender-${transaction.name}-${index}`}
              className={`flex items-center gap-3 ${
                index === arr.length - 1
                  ? "pb-0 pt-3"
                  : "relative border-b border-grey-100 py-3"
              }`}
            >
              <Image
                src={transaction.avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-preset-4-bold text-grey-900">
                {transaction.name}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-preset-5 mb-3 border-b border-grey-100 pb-3 text-grey-500">
            Category
          </p>
          {paginatedTransactions.map((transaction, index, arr) => (
            <div key={`Category-${transaction.category}-${index}`}>
              <p
                className={`text-preset-5 justfiy-start flex h-[4.0625rem] items-center text-grey-500 ${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "relative border-b border-grey-100 py-3"
                }`}
              >
                {transaction.category}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-preset-5 mb-3 border-b border-grey-100 pb-3 text-grey-500">
            Transaction Date
          </p>
          {paginatedTransactions.map((transaction, index, arr) => (
            <div key={`paginatedTransactions-${transaction.category}-${index}`}>
              <p
                className={`text-preset-5 justfiy-start flex h-[4.0625rem] items-center text-grey-500 ${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "relative border-b border-grey-100 py-3"
                }`}
              >
                {formatDate(transaction.date)}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-preset-5 mb-3 border-b border-grey-100 pb-3 text-grey-500">
            Amount Date
          </p>
          {paginatedTransactions.map((transaction, index, arr) => (
            <div key={`Date-${transaction.category}-${index}`}>
              <p
                className={`text-preset-4-bold flex h-[4.0625rem] flex-col items-start justify-center gap-1 ${transaction.amount > 0 ? "text-green" : "text-grey-900"} ${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "relative border-b border-grey-100 py-3"
                }`}
              >
                {transaction.amount > 0
                  ? `+$${transaction.amount.toFixed(2)}`
                  : `-$${Math.abs(transaction.amount).toFixed(2)}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* controle de paginação */}
      <div className="flex w-full items-center justify-between">
        <button
          className={`text-preset-4 flex h-10 w-full max-w-[5.875rem] items-center justify-center gap-4 rounded-lg border border-beige-500 bg-white text-grey-900 transition-all hover:bg-beige-500 hover:text-white ${currentPage === 1 && "pointer-events-none opacity-50"}`}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <IconCaretLeft className="text-inherit" />
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`text-preset-4 flex h-10 w-10 items-center justify-center rounded-lg transition duration-300 hover:bg-beige-500 hover:text-white ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "border border-gray-300 bg-white text-grey-900"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`text-preset-4 flex h-10 w-full max-w-[5.875rem] items-center justify-center gap-4 rounded-lg border border-beige-500 bg-white text-grey-900 transition-all hover:bg-beige-500 hover:text-white ${currentPage === totalPages && "pointer-events-none opacity-50"}`}
        >
          Next
          <IconCaretRight className="text-inherit" />
        </button>
      </div>
    </article>
  )
}

export default TransactionsTable
