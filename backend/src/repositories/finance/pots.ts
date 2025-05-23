import {
  DeletePotParams,
  IPotRepository,
  MoneyParams,
  PotParams,
  PotReturnTypes,
  withdrawMoneyParams,
} from "@/controllers/finance-user/pots/protocols"
import prisma from "@/database/prisma"
import { validateParams } from "@/utils/validateParams"

export class PotsRepository implements IPotRepository {
  async addPot(params: PotParams): Promise<PotReturnTypes> {
    const { id, name, target, theme, total } = params

    validateParams(params, ["id", "name", "target", "theme", "total"])

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
    }

    const pot = await prisma.pots.create({
      data: {
        name,
        target,
        theme,
        total,
        financeId,
      },
    })

    return {
      pot_id: pot.id,
      success: true,
    }
  }

  async editPot(params: PotParams): Promise<PotReturnTypes> {
    const { id, name, target, theme, total, pot_id } = params

    validateParams(params, ["id", "pot_id", "name", "target", "theme", "total"])

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: { finance: true },
    })

    if (!user?.finance) {
      throw new Error("Finance not found for this user")
    }

    const pot = await prisma.pots.findFirst({
      where: {
        id: pot_id,
        financeId: user.finance.id,
      },
    })

    if (!pot) {
      throw new Error("Pot not found or does not belong to the user")
    }

    await prisma.pots.updateMany({
      where: {
        id: pot_id,
        financeId: user.finance.id,
      },
      data: {
        name,
        target,
        theme,
        total,
      },
    })

    return {
      success: true,
    }
  }

  async deletePot(params: DeletePotParams): Promise<PotReturnTypes> {
    const { id, pot_id } = params

    validateParams(params, ["id", "pot_id"])

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { finance: true },
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (!user.finance) {
      throw new Error("Finance not found for this user")
    }

    // Verifica se o Pot existe e pertence ao Finance correto pelo nome
    const pot = await prisma.pots.findUnique({
      where: {
        id: pot_id,
        financeId: user.finance?.id,
      },
    })

    if (!pot) {
      throw new Error("Pot not found or does not belong to the user")
    }

    await prisma.pots.delete({
      where: {
        id: pot.id,
      },
    })

    return {
      success: true,
    }
  }

  async addMoney(params: MoneyParams): Promise<PotReturnTypes> {
    const { new_amount, pot_id, id } = params

    if (!new_amount || !pot_id || !id === undefined) {
      throw new Error("Missing param: id, pot_id or new_amount")
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { finance: true },
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (!user.finance) {
      throw new Error("Finance not found for this user")
    }

    const updatedPot = await prisma.pots.updateMany({
      where: {
        id: pot_id,
        financeId: user.finance.id,
      },
      data: {
        total: {
          increment: new_amount,
        },
      },
    })

    if (updatedPot.count === 0) {
      throw new Error("Pot not found or does not belong to the user")
    }

    return {
      success: true,
    }
  }

  async withdrawMoney(params: withdrawMoneyParams): Promise<PotReturnTypes> {
    const { id, amount, pot_id } = params

    if (!amount || !pot_id || !id === undefined)
      throw new Error("Missing param: id, pot_id or amount")

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: { finance: true },
    })

    if (!user) throw new Error("User not found")

    if (!user.finance) throw new Error("Finance not found for this user")

    const pot = await prisma.pots.findFirst({
      where: {
        id: pot_id,
        financeId: user.finance.id,
      },
    })

    if (!pot) throw new Error("Pot not found for this user")

    if (pot.total < amount) throw new Error("Insufficient funds in the Pot")

    // Atualiza o Pot, retirando o valor do saldo atual
    await prisma.pots.update({
      where: {
        id: pot_id,
        financeId: user.finance.id,
      },
      data: {
        total: {
          decrement: amount, // Reduz o valor do saldo do Pot
        },
      },
    })

    return {
      success: true,
    }
  }
}
