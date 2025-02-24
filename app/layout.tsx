"use client"

import "./globals.css"

import { Public_Sans } from "next/font/google"
import Head from "next/head"
import { Provider } from "react-redux"

import store from "@/redux/store"

import Sidebar from "./_components/sidebar"

const PublicSans = Public_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Personal finance app - Overview</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={`${PublicSans.className} antialiased`}>
        <div className="flex w-full bg-beige-100">
          <Sidebar />
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
