"use client"

import "./globals.css"

import { Public_Sans } from "next/font/google"
import Head from "next/head"
import { Provider } from "react-redux"

import { ThemeProvider } from "@/components/theme-provider"
import store from "@/redux/store"

import Sidebar from "./_components/sidebar"
import AppProvider from "./AppProvider"

const PublicSans = Public_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Personal finance app - Overview</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={`${PublicSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark:bg-grey-975 flex w-full bg-beige-100">
            <Sidebar />
            <Provider store={store}>
              <AppProvider>{children}</AppProvider>
            </Provider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
