import type { FilterState, SummaryData, Transaction } from "../types";

// Format number to INR currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date to readable string
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Calculate summary from transactions
export const calculateSummary = (transactions: Transaction[]): SummaryData => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  };
};

// Group transactions by month for chart
export const groupByMonth = (transactions: Transaction[]) => {
  const grouped: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit",
    });
    if (!grouped[month]) grouped[month] = { income: 0, expense: 0 };
    if (t.type === "income") grouped[month].income += t.amount;
    else grouped[month].expense += t.amount;
  });

  return Object.entries(grouped).map(([month, values]) => ({
    month,
    ...values,
  }));
};

// Group transactions by category for pie chart
export const groupByCategory = (transactions: Transaction[]) => {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });

  return Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount,
  }));
};

// Apply filters to transactions
export const applyFilters = (
  transactions: Transaction[],
  filters: FilterState,
): Transaction[] => {
  let result = [...transactions];

  // Search
  if (filters.search) {
    result = result.filter((t) =>
      t.description.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  // Category filter
  if (filters.category !== "All") {
    result = result.filter((t) => t.category === filters.category);
  }

  // Type filter
  if (filters.type !== "All") {
    result = result.filter((t) => t.type === filters.type);
  }

  // Sorting
  result.sort((a, b) => {
    if (filters.sortBy === "date") {
      return filters.sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return filters.sortOrder === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
  });

  return result;
};
