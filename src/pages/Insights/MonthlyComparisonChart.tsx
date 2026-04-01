import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useApp } from "../../context/useApp";
import { getMonthlyComparison } from "../../utils/insights";
import { formatCurrency } from "../../utils/helpers";

export const MonthlyComparisonChart = () => {
  const { transactions } = useApp();
  const data = getMonthlyComparison(transactions);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Monthly Income vs Expenses
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Side by side comparison per month
        </p>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) =>
                value != null ? formatCurrency(Number(value)) : ""
              }
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "13px",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
            />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="savings"
              name="Savings"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
