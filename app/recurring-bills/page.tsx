"use client"

import RecurringBillsTable from "./_components/recurringBillsTable"
import Summary from "./_components/summary"
import TotalBills from "./_components/totalBills"
import { motion } from "framer-motion"

const RecurringPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-beige-100"
    >
      <div className="w-full px-10 py-8">
        <h1 className="text-preset-1 mb-8 text-grey-900">Recurring Bills</h1>
        <div className="flex w-full items-start justify-start gap-6">
          <div className="flex w-full max-w-[21.0625rem] flex-col items-center gap-6">
            <TotalBills />
            <Summary />
          </div>

          <RecurringBillsTable />
        </div>
      </div>
    </motion.main>
  )
}

export default RecurringPage
