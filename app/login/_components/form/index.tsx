"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useForm } from "react-hook-form"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string
    password: string
  }>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

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
            {...register("password", { required: "Password is required" })}
          />

          <div className="mt-4">
            <Button variant="primary" type="submit" label="Login" />
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
