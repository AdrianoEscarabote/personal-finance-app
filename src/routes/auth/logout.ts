import express from "express"

const logoutRoute = express.Router()

logoutRoute.post("/", async (req, res) => {
  try {
    res.clearCookie("id", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
  } catch (error) {
    console.log(error)
  }
})

export default logoutRoute
