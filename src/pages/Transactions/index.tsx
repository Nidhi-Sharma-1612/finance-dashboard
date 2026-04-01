import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { useApp } from "../../context/useApp";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionTable } from "./TransactionTable";
import { TransactionModal } from "./TransactionModal";
import { PageTransition } from "../../components/PageTransition";
import { applyFilters, exportToCSV } from "../../utils/helpers";

const Transactions = () => {
  const { role, transactions, filters } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const handleExport = () => {
    const filtered = applyFilters(transactions, filters);
    exportToCSV(filtered);
  };

  return (
    <PageTransition>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Transactions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and explore your financial activity
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Export Button — visible to both roles */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 border border-gray-200 dark:border-gray-700
                text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                text-sm font-medium rounded-xl transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Add button — Admin only */}
            {role === "admin" && (
              <button
                onClick={() => {
                  setModalKey((prev) => prev + 1);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-indigo-600 hover:bg-indigo-700
                  text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Transaction</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <TransactionFilters />

        {/* Table */}
        <TransactionTable />
      </div>

      {/* Add Modal */}
      <TransactionModal
        key={modalKey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTransaction={null}
      />
    </PageTransition>
  );
};

export default Transactions;
