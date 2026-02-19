import { Secret, verify } from "jsonwebtoken"

import {
  IUserAuthenticatedRepository,
  UserAuthenticatedParams,
  UserAuthenticatedReturn,
} from "@/controllers/user-authenticated/protocols"
import prisma from "@/database/prisma"

export class UserAuthenticatedRepository implements IUserAuthenticatedRepository {
  async authenticateUser(
    params: UserAuthenticatedParams,
  ): Promise<UserAuthenticatedReturn> {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!user) {
      throw new Error()
    }

    const secret = process.env.SECRET as Secret

    verify(params.token, secret)

    return {
      msg: "success",
    }
  }
}
