"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import IconLogout from "@/app/_icons/icon-logout"
import { clearData } from "@/redux/finance/reducer"

import Loading from "../loading"

const LogoutButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [logout, setLogout] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleLogout = async () => {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      )
      if (response.status === 200) {
        localStorage.removeItem("demoMode")
        dispatch(clearData())
        router.push("/login")
      }
    }
    if (logout) {
      handleLogout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout])

  return (
    <button
      className="text-preset-3 relative flex h-11 w-[130px] items-center gap-3 rounded-md bg-grey-900 px-5 py-2 text-grey-100 transition-all duration-300 hover:bg-grey-500"
      onClick={() => setLogout(true)}
    >
      {!loading ? (
        <>
          <IconLogout className="w-full text-grey-100" />
          Logout
        </>
      ) : (
        <Loading theme="light" />
      )}
    </button>
  )
}

export default LogoutButton
