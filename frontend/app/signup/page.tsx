import IntroBanner from "../_components/introBanner"
import Form from "./_components/form"

export const metadata = {
  title: "Personal finance app - Signup",
}

const SignupPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <h1 className="sr-only">Personal finance app - Signup</h1>
      <div className="mx-auto h-full w-full max-w-[90rem] px-5">
        <section className="flex h-full w-full flex-col items-center justify-between lg:flex-row">
          <IntroBanner />
          <div className="mt-20 w-full max-w-[35rem] lg:mt-0">
            <Form />
          </div>
        </section>
      </div>
    </main>
  )
}

export default SignupPage
