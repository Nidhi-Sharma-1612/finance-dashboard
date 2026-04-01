// Transaction Categories
export type Category =
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Healthcare"
  | "Bills & Utilities"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Other";

// Transaction Type
export type TransactionType = "income" | "expense";

// Core Transaction Model
export interface Transaction {
  id: string;
  date: string; // "YYYY-MM-DD" format
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

// Role Based Access
export type Role = "admin" | "viewer";

// Summary Card Data
export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

// Filter State
export interface FilterState {
  search: string;
  category: Category | "All";
  type: TransactionType | "All";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}
