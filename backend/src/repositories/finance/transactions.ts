import {
  ITransactionRepository,
  TransactionParams,
  TransactionReturnTypes,
} from "@/controllers/finance-user/transactions/protocols"
import prisma from "@/database/prisma"
import { Transactions } from "@/models/user"
import { validateParams } from "@/utils/validateParams"

export class TransactionRepository implements ITransactionRepository {
  async addTransaction(
    params: TransactionParams,
  ): Promise<TransactionReturnTypes> {
    validateParams(params, [
      "id",
      "name",
      "date",
      "category",
      "amount",
      "avatar",
    ])

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: { finance: true },
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (user?.finance === null) {
      throw new Error("User finance not found")
    }

    await prisma.transactions.create({
      data: {
        name: params.name,
        date: new Date(params.date),
        category: params.category,
        amount: params.amount,
        recurring: params.recurring,
        financeId: user.finance.id,
        avatar: params.avatar,
      },
    })

    await this.updateBalance(user.finance.id)

    return { success: true }
  }

  private async updateBalance(financeId: string) {
    const transactions = await prisma.transactions.findMany({
      where: { financeId },
    })

    const income = transactions
      .filter((t: Transactions) => t.amount > 0)
      .reduce((acc: number, t: Transactions) => acc + t.amount, 0)

    const expenses = transactions
      .filter((t: Transactions) => t.amount < 0)
      .reduce((acc: number, t: Transactions) => acc + Math.abs(t.amount), 0)

    const current = income - expenses

    await prisma.balance.upsert({
      where: { financeId },
      update: {
        income,
        expenses,
        current,
      },
      create: {
        financeId,
        income,
        expenses,
        current,
      },
    })
  }
}
