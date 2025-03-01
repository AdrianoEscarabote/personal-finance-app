import { useEffect, useState } from "react"

const useUserAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkUserAuthenticated = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/user-authenticated`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    )
    if (response.status === 200) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkUserAuthenticated()
  }, [])

  return {
    isAuthenticated,
  }
}

export default useUserAuthenticated
