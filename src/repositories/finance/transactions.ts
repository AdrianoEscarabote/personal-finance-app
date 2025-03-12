import {
  ITransactionRepository,
  TransactionParams,
  TransactionReturnTypes,
} from "@/controllers/finance-user/transactions/protocols"
import { badRequest } from "@/controllers/helpers"
import prisma from "@/database/prisma"
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

    return { success: true }
  }
}
