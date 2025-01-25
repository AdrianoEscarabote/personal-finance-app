"use client"
import Button from "@/app/_components/button"
import { RootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"

const PotsCard = () => {
  const { pots } = useSelector((rootState: RootState) => rootState.financeSlice)
  return (
    <article className="">
      <div className="flex w-full flex-wrap gap-6">
        {pots.map((pot) => {
          const progress = (pot.total / pot.target) * 100
          return (
            <div
              key={pot.name}
              className="w-full max-w-[518px] rounded-xl bg-white p-6"
            >
              <div className="mb-8 flex max-h-6 items-center gap-3">
                <div
                  style={{ backgroundColor: pot.theme }}
                  className="h-4 w-4 rounded-full"
                ></div>
                <p className="text-preset-2 text-grey-900">{pot.name}</p>
              </div>

              <div className="mb-4">
                <p className="text-preset-4 flex items-center justify-between text-grey-500">
                  Total Saved:{" "}
                  <span className="text-preset-1 text-grey-900">
                    ${pot.total.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Barra de Progresso */}
              <div className="relative mt-2 h-2 w-full rounded-full bg-grey-100">
                <div
                  style={{ width: `${progress}%`, backgroundColor: pot.theme }}
                  className="absolute h-full rounded-full"
                ></div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-preset-5-bold text-grey-500">
                  {progress.toFixed(2)}%
                </p>
                <p className="text-preset-5 text-grey-500">
                  Target of ${pot.target}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button variant="secondary" label="+ Add Money" />
                <Button variant="secondary" label="Withdraw" />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default PotsCard
