"use client"

import "./globals.css"

import { Provider } from "react-redux"

import { ThemeProvider } from "@/components/theme-provider"
import store from "@/redux/store"

import PWARegister from "./_components/PWARegister"
import Sidebar from "./_components/sidebar"
import AppProvider from "./AppProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex w-full bg-beige-100 dark:bg-grey-975">
        <Sidebar />
        <Provider store={store}>
          <AppProvider>{children}</AppProvider>
        </Provider>
      </div>
      <PWARegister />
    </ThemeProvider>
  )
}
