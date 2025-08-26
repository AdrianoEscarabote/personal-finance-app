import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import useGetData from "./useGetData"

const useAuthOnHome = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { handleGetData } = useGetData()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const publicRoutes = ["/login", "/signup"]

    if (publicRoutes.includes(pathName)) {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user-authenticated`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (response.status !== 200) {
          router.push("/login")
          return
        }
        handleGetData()
      } catch (error) {
        console.error("Auth error on home:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router, pathName, handleGetData])

  return { isLoading }
}

export default useAuthOnHome
