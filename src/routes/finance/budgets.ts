import express from "express"

import { BudgetController } from "@/controllers/finance-user/budget/budget"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { BudgetRepository } from "@/repositories/finance/budget"

const budgetsRoute = express.Router()

budgetsRoute.post("/add_budget", authMiddleware, async (req, res) => {
  const budgetRepository = new BudgetRepository()

  const budgetController = new BudgetController(budgetRepository)

  const { body, statusCode } = await budgetController.addBudget({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

budgetsRoute.post("/edit_budget", authMiddleware, async (req, res) => {
  const budgetRepository = new BudgetRepository()

  const budgetController = new BudgetController(budgetRepository)

  const { body, statusCode } = await budgetController.editBudget({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

export default budgetsRoute
