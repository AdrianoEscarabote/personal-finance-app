import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"

const useDemoFetch = () => {
  const demoMode = useSelector((state: RootState) => state.demoMode)

  const demoFetch = async (url: string, options?: RequestInit) => {
    if (demoMode) {
      console.log("Demo Mode: No requests allowed to backend.")
      return null
    }

    const response = await fetch(url, options)
    return response
  }

  return { demoFetch }
}

export default useDemoFetch
