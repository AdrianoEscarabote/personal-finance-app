import express from "express"

import budgetsRoute from "./finance/budgets"
import potsRoute from "./finance/pots"

const financeRouter = express.Router()

financeRouter.use("/budgets", budgetsRoute)
financeRouter.use("/pots", potsRoute)

export default financeRouter
