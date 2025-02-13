"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const IntroBanner = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)

    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  return (
    <>
      {isMobile ? (
        <div className="absolute left-0 top-0 flex w-full items-center justify-center rounded-ee-lg rounded-es-lg bg-grey-900 px-10 py-6">
          <Image
            src={"/images/logo-large.svg"}
            alt=""
            width={121}
            height={22}
          />
        </div>
      ) : (
        <div className="flex min-h-full w-full">
          <div className="relative my-5 flex min-h-full max-w-[35rem] flex-col justify-between rounded-xl bg-grey-900 bg-[url('/images/illustration-authentication.svg')] bg-no-repeat p-10">
            <Image
              src={"/images/logo-large.svg"}
              alt=""
              width={121}
              height={22}
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-preset-1 text-white">
                Keep track of your money and save for your future
              </h2>
              <p className="text-preset-4 text-white">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default IntroBanner
