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

    return res.status(200).json({
      msg: "success!",
    })
  } catch (error) {
    return res.status(500).json({ msg: "server error!" })
  }
})

export default logoutRoute
