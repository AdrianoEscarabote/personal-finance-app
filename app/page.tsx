"use client"

import { motion } from "framer-motion"

import useGetData from "@/hooks/useGetData"

import Budgets from "./_components/budgets"
import FinancialSummary from "./_components/financialSummary"
import Loading from "./_components/loading"
import Pots from "./_components/pots"
import RecurringBills from "./_components/recurringBills"
import Transactions from "./_components/transactions"

export default function Home() {
  const { isPending } = useGetData()

  return (
    <>
      {isPending && <Loading />}
      <motion.div
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-24 mt-6 flex w-full flex-col gap-8 px-4 transition-all duration-300 md:mb-0 md:mt-8 md:p-0 lg:pl-10"
      >
        <h1 className="text-preset-1 text-grey-900">Overview</h1>

        <FinancialSummary />

        <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row">
          <div className="flex w-full max-w-[38rem] flex-col gap-6">
            <Pots />
            <Transactions />
          </div>
          <div className="flex w-full flex-col gap-6 md:max-w-[428px]">
            <Budgets />
            <RecurringBills />
          </div>
        </div>
      </motion.div>
    </>
  )
}
