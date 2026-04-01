import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useApp } from "../../context/useApp";
import { calculateSummary } from "../../utils/helpers";
import { formatCurrency } from "../../utils/helpers";

export const SummaryCards = () => {
  const { transactions } = useApp();
  const { totalBalance, totalIncome, totalExpenses } =
    calculateSummary(transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      color: "indigo",
      trend: null,
    },
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: "emerald",
      trend: "up",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: "rose",
      trend: "down",
    },
  ];

  const colorMap: Record<string, string> = {
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {label}
            </span>
            <div className={`p-2 rounded-xl ${colorMap[color]}`}>
              <Icon size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};
