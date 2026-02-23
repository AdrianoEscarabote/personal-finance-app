import { Public_Sans } from "next/font/google"

import Providers from "./providers"

export const metadata = {
  title: "Personal finance app - Overview",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/icon-192x192.png",
    apple: "/images/icon-192x192.png",
    shortcut: "/favicon.ico",
  },
}

export const viewport = {
  themeColor: "#277C78",
}

const PublicSans = Public_Sans({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${PublicSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
