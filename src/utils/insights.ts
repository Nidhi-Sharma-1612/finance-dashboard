import type { Transaction } from "../types";

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface CategorySpend {
  category: string;
  amount: number;
  percentage: number;
}

// Get last 2 months label + data for comparison
export const getMonthlyComparison = (
  transactions: Transaction[],
): MonthlyData[] => {
  const grouped: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((t) => {
    const key = new Date(t.date).toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit",
    });
    if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
    if (t.type === "income") grouped[key].income += t.amount;
    else grouped[key].expense += t.amount;
  });

  return Object.entries(grouped).map(([month, { income, expense }]) => ({
    month,
    income,
    expense,
    savings: income - expense,
  }));
};

// Get top spending categories with percentage
export const getTopCategories = (
  transactions: Transaction[],
): CategorySpend[] => {
  const grouped: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });

  const total = Object.values(grouped).reduce((sum, v) => sum + v, 0);

  return Object.entries(grouped)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

// Get highest spending category
export const getHighestCategory = (transactions: Transaction[]): string => {
  const top = getTopCategories(transactions);
  return top.length > 0 ? top[0].category : "N/A";
};

// Get savings rate percentage
export const getSavingsRate = (transactions: Transaction[]): number => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  if (income === 0) return 0;
  return Math.round(((income - expense) / income) * 100);
};

// Get most active month (most transactions)
export const getMostActiveMonth = (transactions: Transaction[]): string => {
  const grouped: Record<string, number> = {};

  transactions.forEach((t) => {
    const key = new Date(t.date).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
    grouped[key] = (grouped[key] || 0) + 1;
  });

  return Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
};

// Month over month expense change
export const getExpenseChange = (transactions: Transaction[]): number => {
  const monthly = getMonthlyComparison(transactions);
  if (monthly.length < 2) return 0;

  const last = monthly[monthly.length - 1].expense;
  const prev = monthly[monthly.length - 2].expense;

  if (prev === 0) return 0;
  return Math.round(((last - prev) / prev) * 100);
};
