import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import IconMinimizeMenu from "@/app/_icons/icon-minimize-menu"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/useIsMobile"

const ThemeToggle = ({
  isMinimized,
  setIsMinimized,
}: {
  isMinimized: boolean
  setIsMinimized: (value: boolean) => void
}) => {
  const isMobile = useIsMobile()
  const { setTheme, theme } = useTheme()

  return (
    <div>
      <div
        className={`${isMinimized ? "mx-auto flex items-center justify-center" : "ml-8 flex items-center"} my-4`}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="border border-grey-500 text-grey-300 dark:border-border"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        {!isMinimized && (
          <span className="text-preset-4 ml-3 text-grey-300">Toggle theme</span>
        )}
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
  )
}

export default ThemeToggle
