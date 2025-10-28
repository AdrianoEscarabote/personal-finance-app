"use client"

import { Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function ThemeFab() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted || !isMobile) return null
  if (pathname === "/login" || pathname === "/signup") return null

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-[calc(64px+env(safe-area-inset-bottom)+12px)] right-4 z-[60] h-12 w-12 border border-border bg-background/90 text-foreground shadow-lg backdrop-blur hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background supports-[backdrop-filter]:bg-background/60 dark:hover:bg-muted/60"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
