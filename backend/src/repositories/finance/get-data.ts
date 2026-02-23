/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetDataParams,
  GetDataReturnTypes,
  IGetDataRepository,
} from "@/controllers/finance-user/get-data/protocols"
import prisma from "@/database/prisma"

export class GetDataRepository implements IGetDataRepository {
  async getData(params: GetDataParams): Promise<GetDataReturnTypes> {
    const { id } = params

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        finance: true,
      },
    })

    const financeId = user?.finance?.id

    if (!financeId) {
      throw new Error("Finance not found")
    }

    if (!user) {
      throw new Error("User not found")
    }

    const finance = await prisma.finance.findUnique({
      where: {
        id: financeId,
      },
      include: {
        balance: true,
        budgets: true,
        transactions: true,
        pots: true,
      },
    })

    if (!finance) {
      throw new Error("Finance not found")
    }
    console.log(finance)

    const transactions = (
      await prisma.transactions.findMany({
        where: {
          financeId,
        },
      })
    ).map((transaction: any) => ({
      ...transaction,
      date: transaction.date.toISOString(),
    }))

    const budgets = await prisma.budgets.findMany({
      where: {
        financeId,
      },
    })

    const pots = await prisma.pots.findMany({
      where: {
        financeId,
      },
    })

    let expenses = 0

    const current = finance.balance?.current ? finance.balance.current : 0
    const income = finance.balance?.income ? finance.balance.income : 0
    expenses = finance.balance?.expenses ? finance.balance.expenses : 0

    return {
      success: true,
      finance: {
        transactions: transactions,
        budgets: budgets,
        pots: pots,
        balance: {
          current: current,
          income: income,
          expenses: expenses,
        },
      },
    }
  }
}
