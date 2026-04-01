import {
  TrendingUp,
  TrendingDown,
  Flame,
  CalendarDays,
  PiggyBank,
  BarChart2,
} from "lucide-react";
import { useApp } from "../../context/useApp";
import {
  getHighestCategory,
  getSavingsRate,
  getMostActiveMonth,
  getExpenseChange,
} from "../../utils/insights";
import { formatCurrency, calculateSummary } from "../../utils/helpers";

export const InsightCards = () => {
  const { transactions } = useApp();

  const savingsRate = getSavingsRate(transactions);
  const highestCategory = getHighestCategory(transactions);
  const mostActiveMonth = getMostActiveMonth(transactions);
  const expenseChange = getExpenseChange(transactions);
  const { totalIncome, totalExpenses } = calculateSummary(transactions);

  const cards = [
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      subtext:
        savingsRate >= 20 ? "Great savings habit!" : "Try to save at least 20%",
      icon: PiggyBank,
      color: savingsRate >= 20 ? "emerald" : "amber",
    },
    {
      label: "Top Spending Category",
      value: highestCategory,
      subtext: "Highest expense area",
      icon: Flame,
      color: "rose",
    },
    {
      label: "Most Active Month",
      value: mostActiveMonth,
      subtext: "Most transactions recorded",
      icon: CalendarDays,
      color: "indigo",
    },
    {
      label: "Month-over-Month Expenses",
      value: `${expenseChange > 0 ? "+" : ""}${expenseChange}%`,
      subtext:
        expenseChange > 0
          ? "Expenses increased vs last month"
          : "Expenses decreased vs last month",
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      color: expenseChange > 0 ? "rose" : "emerald",
    },
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      subtext: "Across all recorded months",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      subtext: "Across all recorded months",
      icon: BarChart2,
      color: "rose",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(({ label, value, subtext, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {label}
            </span>
            <div className={`p-2 rounded-xl ${colorMap[color]}`}>
              <Icon size={16} />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>
        </div>
      ))}
    </div>
  );
};
