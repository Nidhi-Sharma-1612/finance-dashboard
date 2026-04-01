import { SummaryCards } from "./SummaryCards";
import { BalanceTrendChart } from "./BalanceTrendChart";
import { SpendingBreakdownChart } from "./SpendingBreakdownChart";
import { useApp } from "../../context/useApp";
import { PageTransition } from "../../components/PageTransition";

const Dashboard = () => {
  const { transactions } = useApp();
  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your financial overview at a glance
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {transactions.length === 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-sm text-amber-700 dark:text-amber-400">
            ⚠️ No transactions found. Switch to Admin role and add some
            transactions to get started.
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BalanceTrendChart />
          <SpendingBreakdownChart />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
