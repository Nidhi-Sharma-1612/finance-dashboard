import { useApp } from "../../context/useApp";
import { getTopCategories } from "../../utils/insights";
import { formatCurrency } from "../../utils/helpers";

const COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

export const CategoryRankList = () => {
  const { transactions } = useApp();
  const categories = getTopCategories(transactions);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Spending by Category
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Ranked from highest to lowest
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          No expense data available
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map(({ category, amount, percentage }, index) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-4">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {percentage}%
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${COLORS[index % COLORS.length]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
