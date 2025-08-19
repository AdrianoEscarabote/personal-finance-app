"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import useGetData from "@/hooks/useGetData"
import useHandleDemoMode from "@/hooks/useHandleDemoMode"
import { setDemoMode } from "@/redux/demo/reducer"

const Form = () => {
  const { handleGetData } = useGetData()
  const dispatch = useDispatch()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{
    name: string
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
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )

      if (response.status === 201) {
        router.push("/")
        await handleGetData()
      }
      if (response.status === 409) {
        setLoading(false)
        setError("email", {
          type: "manual",
          message: "User already exists with this email",
        })
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-16 w-full max-w-[35rem] rounded-xl bg-white p-8 shadow-md dark:border dark:border-border dark:bg-grey-950 lg:mt-0"
    >
      <h2 className="text-preset-1 mb-8 text-grey-900 dark:text-grey-100">
        Signup
      </h2>
      <form onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-4">
          <legend className="sr-only">enter your signup information</legend>

          <Input
            variant="basic"
            label="Name"
            errors={errors.name?.message ? true : false}
            errorMessage={errors.name?.message}
            id="name"
            {...register("name", { required: "Name is required" })}
          />

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

          <div className="flex w-full flex-col gap-1">
            <Input
              variant="basic"
              label="Create Password"
              errors={errors.password?.message ? true : false}
              errorMessage={errors.password?.message}
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />

            <span className="text-preset-5 self-end text-grey-500 dark:text-grey-300">
              Passwords must be at least 8 characters
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <Button
              loading={loading}
              disabled={loadingDemo}
              label="Create Account"
              type="submit"
              variant="primary"
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
      <div className="mt-8 flex items-center justify-center gap-2">
        <p className="text-preset-4 text-grey-500 dark:text-grey-300">
          Need to create an account?{" "}
        </p>
        <Link
          className="text-preset-4-bold text-grey-900 underline dark:text-grey-100"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    </motion.div>
  )
}

export default Form
