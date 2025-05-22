import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Hook for login and signup pages
const useAuthOnEntry = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user-authenticated`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (response.status === 200) {
          router.push("/")
        }
      } catch (error) {
        console.error("Auth error on entry:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  return { isLoading }
}

export default useAuthOnEntry
