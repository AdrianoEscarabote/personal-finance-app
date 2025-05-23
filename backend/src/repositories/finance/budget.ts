import {
  BudgetParams,
  budgetsReturnTypes,
  EditBudgetParams,
  IBudgetsRepository,
} from "@/controllers/finance-user/budget/protocols"
import prisma from "@/database/prisma"

export class BudgetRepository implements IBudgetsRepository {
  async addBudget(params: BudgetParams): Promise<budgetsReturnTypes> {
    const { budget_name, budget_value, id, theme } = params

    if (!budget_name || !budget_value || !id || !theme) {
      throw new Error("Missing param: id, budget_name, theme or budget_value")
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { finance: true },
    })

    if (!user) {
      throw new Error("User not found")
    }

    let financeId = user.finance?.id

    if (!financeId) {
      const newFinance = await prisma.finance.create({
        data: {
          user: { connect: { id: user.id } },
        },
      })
      financeId = newFinance.id
      console.log("Created new finance", financeId)
    }

    const budget = await prisma.budgets.create({
      data: {
        category: budget_name,
        maximum: budget_value,
        theme: theme,
        financeId,
      },
    })

    return { success: true, budget_id: budget.id }
  }

  async editBudget(params: EditBudgetParams): Promise<budgetsReturnTypes> {
    const { budget_name, budget_value, id, theme, budget_id } = params

    if (!budget_name || !budget_value || !id || !theme || !budget_id) {
      throw new Error(
        "Missing param: id, budget_name, budget_id, theme or budget_value",
      )
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { finance: true },
    })

    if (!user?.finance) {
      throw new Error("Finance not found for this user")
    }

    await prisma.budgets.updateMany({
      where: {
        id: budget_id,
        financeId: user.finance.id,
      },
      data: {
        category: budget_name,
        maximum: budget_value,
        theme: theme,
      },
    })

    return {
      success: true,
    }
  }

  async deleteBudget(params: {
    budget_id: string
    id: string
  }): Promise<budgetsReturnTypes> {
    const { budget_id, id } = params

    if (!budget_id || !id) {
      throw new Error("Missing param: id or budget_id")
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { finance: true },
    })

    if (!user?.finance) {
      throw new Error("Finance not found for this user")
    }

    await prisma.budgets.delete({
      where: {
        id: budget_id,
        financeId: user.finance.id,
      },
    })

    return {
      success: true,
    }
  }
}
