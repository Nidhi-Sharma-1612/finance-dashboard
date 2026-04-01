import type { FilterState } from "../types";

export const defaultFilters: FilterState = {
  search: "",
  category: "All",
  type: "All",
  sortBy: "date",
  sortOrder: "desc",
};
