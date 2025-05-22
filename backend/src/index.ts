import "dotenv/config"

import cors from "cors"
import express, { NextFunction, Request, Response } from "express"

import authRouter from "./routes/authRouter"

const app = express()

import cookieParser from "cookie-parser"

import { authMiddleware } from "./middlewares/authMiddleware"
import financeRouter from "./routes/financeRouter"

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin:
      "https://personal-finance-app-adrianoescarabotes-projects.vercel.app",
    credentials: true,
  }),
)

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://personal-finance-app-adrianoescarabotes-projects.vercel.app",
  )
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

app.use("/auth", authRouter)
app.use("/finance", authMiddleware, financeRouter)

app.listen(4000, () => {
  console.log("listening on port 4000")
})
