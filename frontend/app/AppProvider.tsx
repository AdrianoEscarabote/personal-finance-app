"use client"

import React from "react"

import useAuthOnHome from "@/hooks/useAuthOnHome"

import Loading from "./_components/loading"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthOnHome()

  if (isLoading) {
    return <Loading theme="dark" align="center" />
  }

  return children
}

export default AppProvider
