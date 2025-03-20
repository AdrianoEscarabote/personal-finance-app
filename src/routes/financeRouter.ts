import express from "express"

import budgetsRoute from "./finance/budgets"
import potsRoute from "./finance/pots"
import TransactionRoute from "./finance/transactions"

const financeRouter = express.Router()

financeRouter.use("/budgets", budgetsRoute)
financeRouter.use("/pots", potsRoute)
financeRouter.use("/transactions", TransactionRoute)

export default financeRouter
