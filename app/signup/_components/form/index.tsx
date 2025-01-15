"use client"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import Link from "next/link"
import { useForm } from "react-hook-form"

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string
    email: string
    password: string
  }>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="mt-16 w-full max-w-[560px] rounded-xl bg-white p-8 shadow-md lg:mt-0">
      <h2 className="text-preset-1 mb-8 text-grey-900">Signup</h2>
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

          <Input
            variant="basic"
            label="Password"
            errors={errors.password?.message ? true : false}
            errorMessage={errors.password?.message}
            id="password"
            {...register("password", { required: "Password is required" })}
          />

          <div className="mt-4">
            <Button label="Create Account" type="submit" variant="primary" />
          </div>
        </fieldset>
      </form>
      <div className="mt-8 flex items-center justify-center gap-3">
        <p className="text-preset-4 text-grey-500">
          Need to create an account?{" "}
        </p>
        <Link
          className="text-preset-4-bold text-grey-900 underline"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Form
