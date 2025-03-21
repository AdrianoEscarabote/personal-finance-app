import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import IconBillPaid from "@/app/_icons/icon-bill-paid"
import IconCaretDown from "@/app/_icons/icon-caret-down"
import { RootState } from "@/redux/reduxTypes"
import { listColors } from "@/utils/constants"

import { ColorTagProps } from "./colorTagProps"

const ColorTag = ({ label, theme, setTheme }: ColorTagProps) => {
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [showColors, setShowColors] = useState<boolean>(false)

  const filteredColors = listColors

  const initialColor =
    typeof theme === "string"
      ? filteredColors.find((color) => color.hex === theme) || filteredColors[0]
      : filteredColors[0]

  const [selectedColor, setSelectedColor] = useState<{
    name: string
    hex: string
  }>(initialColor)

  const isColorUsed = (hex: string) =>
    hex !== theme && budgets.some((budget) => budget.theme === hex)

  useEffect(() => {
    setTheme(initialColor.hex)
    setSelectedColor(initialColor)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative max-w-[31rem]">
      <p className="text-preset-5-bold pb-1 text-grey-500">{label}</p>

      <button
        type="button"
        onClick={() => setShowColors(!showColors)}
        className={`flex h-[2.8125rem] w-full items-center justify-between rounded-lg border border-beige-500 px-5 transition-all ${showColors && "border-grey-900"}`}
        data-testid="color-tag-button"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: selectedColor.hex }}
          ></div>
          {selectedColor.name}
        </div>
        <IconCaretDown
          className={`text-grey-900 ${showColors && "rotate-180"} transition-all`}
        />
      </button>

      <div
        className={`absolute right-0 top-[5rem] w-full max-w-[31rem] overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
          showColors
            ? "max-h-[18.625rem] overflow-y-scroll opacity-100 scrollbar-thin scrollbar-track-grey-100 scrollbar-thumb-grey-300"
            : "max-h-0 opacity-0"
        }`}
        style={{
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="px-5 py-3">
          {listColors.map((color, index, arr) => (
            <button
              type="button"
              key={color.name}
              className={`${
                index === arr.length - 1
                  ? "pb-0 pt-3"
                  : "border-b border-grey-100 py-3"
              } text-preset-4 relative flex w-full items-center gap-3 text-grey-900 ${isColorUsed(color.hex) ? "cursor-not-allowed opacity-50" : "hover:bg-grey-100"}`}
              tabIndex={!showColors ? -1 : undefined}
              onClick={() => {
                setShowColors(false)
                setSelectedColor({ name: color.name, hex: color.hex })
                setTheme(color.hex)
              }}
              disabled={isColorUsed(color.hex)}
              data-testid={`${color.name}`}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="text-preset-4 text-grey-900">{color.name}</span>
              {selectedColor.name === color.name && (
                <IconBillPaid className="absolute right-0 text-green" />
              )}
              {isColorUsed(color.hex) && (
                <span className="text-preset-5 absolute right-0 text-grey-900">
                  Already used
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorTag
