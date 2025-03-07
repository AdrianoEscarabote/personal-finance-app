import express from "express"

import loginRoute from "./auth/login"
import signupRoute from "./auth/signup"
import userAuthenticatedRoute from "./auth/user-authenticated"

const authRouter = express.Router()

authRouter.use("/signup", signupRoute)
authRouter.use("/login", loginRoute)
authRouter.use("/user-authenticated", userAuthenticatedRoute)

export default authRouter
