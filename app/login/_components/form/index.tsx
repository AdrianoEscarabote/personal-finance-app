"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import Loading from "@/app/_components/loading"
import useAuthOnEntry from "@/hooks/useAuthOnEntry"
import useHandleDemoMode from "@/hooks/useHandleDemoMode"
import { setDemoMode } from "@/redux/demo/reducer"

const Form = () => {
  const { isLoading } = useAuthOnEntry()

  const dispatch = useDispatch()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{
    email: string
    password: string
  }>()

  const { fetchAuthDemoMode, loadingDemo } = useHandleDemoMode()

  const handleDemoMode = () => {
    localStorage.setItem("demoMode", "true")
    dispatch(setDemoMode(true))
    fetchAuthDemoMode()
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )
      const responseJson = await response.json()

      if (response.status === 200) {
        router.push("/")
      } else {
        setError("email", {
          message: responseJson.error,
        })
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  })

  if (isLoading) {
    return <Loading theme="dark" align="center" />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-16 w-full max-w-[35rem] rounded-xl bg-white p-8 shadow-md lg:mt-0"
    >
      <h2 className="text-preset-1 mb-8 text-grey-900">Login</h2>
      <form onSubmit={onSubmit} className="w-full">
        <fieldset className="flex w-full flex-col gap-4">
          <legend className="sr-only">enter your login information</legend>

          <Input
            variant="basic"
            label="Email"
            errors={errors.email?.message ? true : false}
            errorMessage={errors.email?.message}
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <Input
            variant="basic"
            label="Password"
            errors={errors.password?.message ? true : false}
            errorMessage={errors.password?.message}
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />

          <div className="mt-4 space-y-4">
            <Button
              loading={loading}
              disabled={loadingDemo}
              variant="primary"
              type="submit"
              label="Login"
            />
            <Button
              loading={loadingDemo}
              disabled={loading}
              variant="secondary"
              type="button"
              onClick={handleDemoMode}
              label="Demo Mode"
            />
          </div>
        </fieldset>
      </form>
      <div className="mt-8 flex items-center justify-center gap-3">
        <p className="text-preset-4 text-grey-500">
          Need to create an account?{" "}
        </p>
        <Link
          className="text-preset-4-bold text-grey-900 underline"
          href={"/signup"}
        >
          Sign Up
        </Link>
      </div>
    </motion.div>
  )
}

export default Form
