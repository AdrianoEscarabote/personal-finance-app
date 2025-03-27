import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"

const useDemoFetch = () => {
  const demoModeState = useSelector((state: RootState) => state.demoMode)
  const isDemoMode =
    typeof window !== "undefined" ? localStorage.getItem("demoMode") : null

  const demoFetch = async (url: string, options?: RequestInit) => {
    if (demoModeState || isDemoMode === "true") {
      console.log("Demo mode active, skipping fetch")
      return null
    }

    const response = await fetch(url, options)
    return response
  }

  return { demoFetch, isDemoMode }
}

export default useDemoFetch
