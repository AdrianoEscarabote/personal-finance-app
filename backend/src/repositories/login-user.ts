import { compare } from "bcrypt"

import {
  ILoginUserRepository,
  LoginUserParams,
  LoginUserReturnTypes,
} from "@/controllers/login-user/protocols"
import prisma from "@/database/prisma"

export class LoginUserRepository implements ILoginUserRepository {
  async loginUser(params: LoginUserParams): Promise<LoginUserReturnTypes> {
    const user = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    // Check if password matches
    const checkPassword = await compare(params.password, user.password)

    if (!checkPassword) {
      throw new Error("Invalid password")
    }

    const { id } = user

    return {
      id,
      success: true,
    }
  }
}
