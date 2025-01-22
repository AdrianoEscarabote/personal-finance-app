import IconCaretDown from "@/app/_icons/icon-caret-down"
import { useState } from "react"
import { ColorTagProps } from "./colorTagProps"

const listColors = [
  {
    name: "Green",
    hex: "#277c78",
  },
  {
    name: "Yellow",
    hex: "#f2cdac",
  },
  {
    name: "Cyan",
    hex: "#82c9d7",
  },
  {
    name: "Red",
    hex: "#c94736",
  },
  {
    name: "Purple",
    hex: "#826cb0",
  },
  {
    name: "Turquiose",
    hex: "#597c7c",
  },
  {
    name: "Brown",
    hex: "#93674f",
  },
  {
    name: "Magenta",
    hex: "#934f6f",
  },
  {
    name: "Blue",
    hex: "#3f82b2",
  },
  {
    name: "Navy Grey",
    hex: "#97a0ac",
  },
  {
    name: "Army Green",
    hex: "#7f9161",
  },
  {
    name: "Pink",
    hex: "#af81ba",
  },
  {
    name: "Gold",
    hex: "#cab361",
  },
  {
    name: "Orange",
    hex: "#be6c49",
  },
]

const ColorTag = ({ label }: ColorTagProps) => {
  const [showColors, setShowColors] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<{
    name: string
    hex: string
  }>({ name: "Green", hex: "#277c78" })

  return (
    <div className="relative max-w-[31rem]">
      <p className="text-preset-5-bold pb-1 text-grey-500">{label}</p>

      <button
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
              key={color.name}
              className={`${
                index === arr.length - 1
                  ? "pb-0 pt-3"
                  : "border-b border-grey-100 py-3"
              } text-preset-4 flex w-full items-center gap-3 text-grey-900`}
              tabIndex={!showColors ? -1 : undefined}
              onClick={() => {
                setShowColors(false)
                setSelectedColor({ name: color.name, hex: color.hex })
              }}
              data-testid={`${color.name}`}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="text-preset-4 text-grey-900">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorTag
