import { PrismaClient } from "@prisma/client"
import cors from "cors"
import express, { Request, Response } from "express"

import authRouter from "./routes/authRouter"

const app = express()
const prisma = new PrismaClient()

import cookieParser from "cookie-parser"

import { authMiddleware } from "./middlewares/authMiddleware"
import financeRouter from "./routes/financeRouter"

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
)

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true)
    },
    credentials: true,
  }),
)

app.use("/auth", authRouter)
app.use("/finance", authMiddleware, financeRouter)

app.get("/", async (req: Request, res: Response) => {
  res.send("oi")
})

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        finance: {
          include: {
            pots: true,
          },
        },
      },
    })
    res.send(users)
  } catch (error) {
    console.log(error)
  }
})

app.listen(4000, () => {
  console.log("listening on port 4000")
})
