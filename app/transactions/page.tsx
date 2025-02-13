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
      <div className="px-10 py-8">
        <h1 className="text-preset-1 mb-8 text-grey-900">Transactions</h1>

        <div>
          <TransactionsTable />
        </div>
      </div>
    </motion.main>
  )
}

export default Transactions
