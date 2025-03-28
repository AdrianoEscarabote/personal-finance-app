"use client"

import { motion } from "framer-motion"

import Budgets from "./_components/budgets"
import FinancialSummary from "./_components/financialSummary"
import LogoutButton from "./_components/logoutButton"
import Pots from "./_components/pots"
import RecurringBills from "./_components/recurringBills"
import Transactions from "./_components/transactions"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-24 mt-6 flex w-full flex-col gap-8 px-4 transition-all duration-300 md:mb-0 md:mt-8 md:p-0 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-[69.375rem] items-center justify-between gap-8">
        <h1 className="text-preset-1 text-grey-900">Overview</h1>

        <LogoutButton />
      </div>

      <FinancialSummary />

      <div className="mx-auto flex w-full max-w-[1110px] flex-col items-start justify-start gap-6 md:flex-row">
        <div className="flex w-full max-w-[38rem] flex-col gap-6">
          <Pots />
          <Transactions />
        </div>
        <div className="flex w-full flex-col gap-6 md:max-w-[26.75rem]">
          <Budgets />
          <RecurringBills />
        </div>
      </div>
    </motion.div>
  )
}
