import { useSelector } from "react-redux"
import { Cell, Pie, PieChart } from "recharts"

import { RootState } from "@/redux/reduxTypes"

import { BudgetPieChartProps } from "./budgetPieChartProps"

const BudgetPieChart = ({ width, height }: BudgetPieChartProps) => {
  const { budgets, transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )

  if (!budgets.length || !transactions.length) {
    return <p>Data unavailable</p>
  }

  const data = budgets.map((budget) => {
    const totalSpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)

    return {
      name: budget.category,
      value: totalSpent,
      color: budget.theme,
    }
  })

  const totalSpent = data.reduce((acc, item) => acc + item.value, 0)
  const totalBudget = budgets.reduce((acc, item) => acc + item.maximum, 0)

  return (
    <article className="relative flex items-center justify-center">
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={110}
          dataKey="value"
          paddingAngle={3}
          cornerRadius={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute text-center">
        <p className="text-preset-1 text-grey-900">${totalSpent.toFixed(0)}</p>
        <p className="text-preset-5 text-grey-500">of ${totalBudget} limit</p>
      </div>
    </article>
  )
}

export default BudgetPieChart
