import { InsightCards } from "./InsightCards";
import { MonthlyComparisonChart } from "./MonthlyComparisonChart";
import { CategoryRankList } from "./CategoryRankList";
import { PageTransition } from "../../components/PageTransition";

const Insights = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Smart observations from your financial data
          </p>
        </div>

        {/* Insight Cards */}
        <InsightCards />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyComparisonChart />
          <CategoryRankList />
        </div>
      </div>
    </PageTransition>
  );
};

export default Insights;
