"use client"

import RecurringBillsTable from "./_components/recurringBillsTable"
import Summary from "./_components/summary"
import TotalBills from "./_components/totalBills"
import { motion } from "framer-motion"
import style from "./style.module.css"

const RecurringPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-[5.5rem] w-full bg-beige-100 md:mb-0"
    >
      <div className="w-full px-5 py-6 md:px-10 md:py-8">
        <h1 className="text-preset-1 mb-8 text-grey-900">Recurring Bills</h1>
        <div className="flex w-full flex-col items-start justify-start gap-6 lg:flex-row">
          <div
            className={`${style.container_bills} flex w-full items-center gap-6 lg:max-w-[21.0625rem]`}
          >
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
