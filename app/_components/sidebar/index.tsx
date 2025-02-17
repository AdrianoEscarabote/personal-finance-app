"use client"

import IconMinimizeMenu from "@/app/_icons/icon-minimize-menu"
import IconNavBudgets from "@/app/_icons/icon-nav-budgets"
import IconNavOverview from "@/app/_icons/icon-nav-overview"
import IconNavPots from "@/app/_icons/icon-nav-pots"
import IconNavRecurringBills from "@/app/_icons/icon-nav-recurring-bills"
import IconNavTransactions from "@/app/_icons/icon-nav-transactions"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const icons = {
  overview: IconNavOverview,
  transactions: IconNavTransactions,
  budgets: IconNavBudgets,
  pots: IconNavPots,
  "recurring-bills": IconNavRecurringBills,
}

type RouteName = keyof typeof icons

const routes: { name: RouteName; path: string; title: string }[] = [
  { name: "overview", path: "/", title: "Personal finance app - Overview" },
  {
    name: "transactions",
    path: "/transactions",
    title: "Personal finance app - Transactions",
  },
  {
    name: "budgets",
    path: "/budgets",
    title: "Personal finance app - Budgets",
  },
  { name: "pots", path: "/pots", title: "Personal finance app - Pots" },
  {
    name: "recurring-bills",
    path: "/recurring-bills",
    title: "Personal finance app - Recurring Bills",
  },
]

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const currentRoute = routes.find((route) => route.path === pathName)
    if (currentRoute) {
      document.title = currentRoute.title
    }
  }, [pathName])

  const isAuthPage = pathName === "/login" || pathName === "/signup"

  if (isAuthPage) return null

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${!isMobile ? (isMinimized ? "w-full max-w-[5.5rem]" : "w-full max-w-[18.75rem]") : ""} z-30 min-h-screen transition-all`}
    >
      <div
        className={`fixed ${isMobile ? "bottom-0 left-0 rounded-se-2xl rounded-ss-2xl pt-2" : "h-full min-h-screen rounded-e-2xl py-6"} flex w-full flex-col justify-between bg-grey-900 ${isMinimized && ""} transition-all ${!isMobile ? (isMinimized ? "max-w-[5.5rem]" : "max-w-[18.75rem]") : ""} `}
      >
        <div>
          {!isMobile &&
            (isMinimized ? (
              <div className="mb-6 flex flex-col items-center justify-center px-8 py-4 pb-10">
                <Image
                  alt=""
                  src={"/images/logo-small.svg"}
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <div className="flex flex-col items-start justify-center px-8 py-4 pb-10">
                <Image
                  alt=""
                  src={"/images/logo-large.svg"}
                  width={120}
                  height={22}
                  className="mb-6"
                />
              </div>
            ))}
          <nav>
            <ul
              className={`${isMobile ? "flex-row justify-evenly px-3" : "flex-col"} flex gap-0 xs:gap-2`}
            >
              {routes.map((route) => {
                const Icon = icons[route.name]

                return (
                  <li
                    key={route.name}
                    className={`${isMobile ? "w-full max-w-[104px]" : ""}`}
                  >
                    <Link
                      href={`${route.path}`}
                      className={`${isMobile ? "text-preset-5-bold h-[44px] w-full max-w-[104px] flex-col justify-center gap-1 xs:h-[66px]" : "text-preset-3 h-[3.5rem] max-w-[17.25rem] gap-3"} flex w-full items-center ${
                        pathName === `${route.path}`
                          ? `${isMobile ? "rounded-se-xl rounded-ss-xl border-b-4" : "rounded-e-xl border-l-4"} border-green bg-beige-100 text-grey-900`
                          : "text-grey-300 hover:text-white"
                      } ${isMinimized ? "justify-center" : `justify-start ${isMobile ? "" : "pl-8"} `} `}
                    >
                      {Icon && (
                        <Icon
                          className={`${pathName === route.path && "text-green"}`}
                          width={24}
                          height={24}
                        />
                      )}
                      {!isMinimized && (
                        <span className="hidden xs:block">
                          {route.name.charAt(0).toUpperCase() +
                            route.name.slice(1)}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        {!isMobile && (
          <button
            className={`${isMinimized ? "justify-center" : "justify-start pl-8"} flex w-full items-center gap-3 p-4 text-grey-300 hover:text-white`}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <IconMinimizeMenu
              width={24}
              height={24}
              className={`${isMinimized && "rotate-180 transform"}`}
            />

            {!isMinimized && <span>Minimize Menu</span>}
          </button>
        )}
      </div>
    </motion.header>
  )
}

export default Sidebar
