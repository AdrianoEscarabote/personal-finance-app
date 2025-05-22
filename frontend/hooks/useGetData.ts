// hooks/useGetData.ts
import axios from "axios"
import { useDispatch } from "react-redux"

import { setData } from "@/redux/finance/reducer"

const useGetData = () => {
  const dispatch = useDispatch()

  const handleGetData = async () => {
    try {
      const demoMode = localStorage.getItem("demoMode")

      if (demoMode === "true") {
        const response = await axios.get("/data.json")
        dispatch(setData(response.data))
        return
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/get-data`,
        { withCredentials: true },
      )
      dispatch(setData(response.data.data.finance))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return { handleGetData }
}

export default useGetData
