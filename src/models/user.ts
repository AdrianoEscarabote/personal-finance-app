import { Finance } from "@prisma/client"

export interface UserTypes {
  email: string
  password: string
  id: string
  finance?: Finance
}
