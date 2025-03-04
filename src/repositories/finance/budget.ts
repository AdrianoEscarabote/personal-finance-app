import {
  BudgetParams,
  budgetsReturnTypes,
  IBudgetsRepository,
} from "@/controllers/finance-user/budget/protocols"
import prisma from "@/database/prisma"

export class BudgetRepository implements IBudgetsRepository {
  async addBudget(params: BudgetParams): Promise<budgetsReturnTypes> {
    const { budget_name, budget_value, id, theme } = params

    if (!budget_name || !budget_value || !id || !theme) {
      throw new Error("Missing param: id, budget_name, theme or budget_value")
    }

    const finance = await prisma.finance.findUnique({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      throw new Error("Finance not found for this user")
    }

    await prisma.budgets.create({
      data: {
        category: budget_name,
        maximum: budget_value,
        theme,
        finance: {
          connect: {
            id: finance.id,
          },
        },
      },
    })

    return {
      success: true,
    }
  }

  async editBudget(params: BudgetParams): Promise<budgetsReturnTypes> {
    const { budget_name, budget_value, id, theme } = params

    if (!budget_name || !budget_value || !id || !theme) {
      throw new Error("Missing param: id, budget_name, theme or budget_value")
    }

    const finance = await prisma.finance.findUnique({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      throw new Error("Finance not found for this user")
    }

    await prisma.budgets.updateMany({
      where: {
        category: budget_name,
        financeId: finance.id,
      },
      data: {
        maximum: budget_value,
        theme: theme,
      },
    })

    return {
      success: true,
    }
  }
}
