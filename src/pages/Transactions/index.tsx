import { useState } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../../context/useApp";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionTable } from "./TransactionTable";
import { TransactionModal } from "./TransactionModal";
import { PageTransition } from "../../components/PageTransition";

const Transactions = () => {
  const { role } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

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

          {/* Add button — Admin only */}
          {role === "admin" && (
            <button
              onClick={() => {
                setModalKey((prev) => prev + 1);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700
                text-white text-sm font-medium rounded-xl transition-colors"
            >
              <Plus size={16} />
              Add Transaction
            </button>
          )}
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
