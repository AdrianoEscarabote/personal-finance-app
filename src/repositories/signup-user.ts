import {
  ISignupUserRepository,
  ReturnSignupUser,
  SignupUserParams,
} from "@/controllers/signup-user/protocols"
import prisma from "@/database/prisma"
import { genSalt, hash } from "bcrypt"

export class SignupUserRepository implements ISignupUserRepository {
  async signupUser(params: SignupUserParams): Promise<ReturnSignupUser> {
    const usersExists = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    })

    if (usersExists) {
      throw new Error("User already exists")
    }

    const salt = await genSalt(12)
    const passwordHash = await hash(params.password, salt)

    const user = await prisma.user.create({
      data: {
        email: params.email,
        password: passwordHash,
        finance: {},
      },
    })

    if (!user) {
      throw new Error("User not created")
    }

    const { email, id, password } = user

    return { id, email, password }
  }
}
