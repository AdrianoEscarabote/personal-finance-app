import { useRouter } from "next/navigation"
import { useState } from "react"

import useGetData from "./useGetData"

const useHandleDemoMode = () => {
  const router = useRouter()
  const [loadingDemo, setLoadingDemo] = useState(false)
  useGetData()

  const fetchAuthDemoMode = async () => {
    try {
      setLoadingDemo(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/auth-demo`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        router.push("/")
      } else {
        console.error("Failed to access demo mode")
      }
      setLoadingDemo(false)
    } catch (error) {
      console.log(error)
    }
  }

  return { loadingDemo, fetchAuthDemoMode }
}

export default useHandleDemoMode
