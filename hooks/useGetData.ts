import axios from "axios"
import { useEffect, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setData } from "@/redux/finance/reducer"
import { RootState } from "@/redux/reduxTypes"

const useGetData = () => {
  const dispatch = useDispatch()
  const {} = useSelector((rootState: RootState) => rootState.financeSlice)
  const [isPending, startTransition] = useTransition()

  const handleGetData = () => {
    startTransition(async () => {
      const response = await axios.get("/data.json").then((res) => res.data)
      if (response) {
        startTransition(() => {
          dispatch(setData(response))
        })
      }
    })
  }

  useEffect(() => {
    handleGetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    isPending,
  }
}

export default useGetData
