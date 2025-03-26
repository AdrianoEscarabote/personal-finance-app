"use client"

import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { useDispatch } from "react-redux"

import { setData } from "@/redux/finance/reducer"

const useAuthAndData = () => {
  const router = useRouter()
  const pathName = usePathname()
  const dispatch = useDispatch()
  const [isPending, startTransition] = useTransition()
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null)

  const checkUserAuthenticated = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user-authenticated`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      )
      setIsAuthenticated(response.status === 200)
    } catch (error) {
      console.error("Auth error:", error)
      setIsAuthenticated(false)
    }
  }

  const handleGetData = async () => {
    const demoMode = localStorage.getItem("demoMode")

    if (demoMode === "true") {
      const response = await axios.get("/data.json")
      dispatch(setData(response.data))
      return
    }

    if (!demoMode && isAuthenticated) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/get-data`,
      )
      dispatch(setData(response.data))
    }
  }

  useEffect(() => {
    const initialize = async () => {
      await checkUserAuthenticated()
      startTransition(() => {
        handleGetData()
      })
    }
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode")
    if (isPending) return

    if (
      isAuthenticated === true &&
      (pathName === "/login" || pathName === "/signup")
    ) {
      router.push("/")
    }

    if (
      !demoMode &&
      isAuthenticated === false &&
      pathName !== "/login" &&
      pathName !== "/signup"
    ) {
      router.push("/login")
    }
  }, [isAuthenticated, isPending, pathName, router])

  return { isAuthenticated, isPending }
}

export default useAuthAndData
