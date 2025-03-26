"use client"

import React from "react"

import useAuthAndData from "@/hooks/useAuthAndData"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useAuthAndData()

  return children
}

export default AppProvider
