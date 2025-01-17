import AuthLayout from "../_components/authLayout"

export const metadata = {
  title: "Personal finance app - Signup",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
