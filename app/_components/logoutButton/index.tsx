"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import IconLogout from "@/app/_icons/icon-logout"

import Loading from "../loading"

const LogoutButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    setLoading(true)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    router.push("/login")
  }
  return (
    <button
      className="text-preset-3 flex h-11 items-center gap-3 rounded-md bg-grey-900 px-5 py-2 text-grey-100 transition-all duration-300 hover:bg-grey-500"
      onClick={handleLogout}
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
