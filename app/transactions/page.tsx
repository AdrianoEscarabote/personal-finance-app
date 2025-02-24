"use client"

import { motion } from "framer-motion"

import TransactionsTable from "./_components/transactionsTable"

const Transactions = () => {
  return (
    <motion.main
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-beige-100"
    >
      <div className="mb:mb-0 mb-20 px-5 py-6 md:px-10 md:py-8">
        <h1 className="text-preset-1 mb-6 text-grey-900 md:mb-8">
          Transactions
        </h1>

        <div>
          <TransactionsTable />
        </div>
      </div>
    </motion.main>
  )
}

export default Transactions
