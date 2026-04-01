import { useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useApp } from "../../context/useApp";
import type { Role } from "../../types";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { role, setRole, darkMode, toggleDarkMode } = useApp();
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/insights": "Insights",
  };

  const currentPage = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="h-16 px-4 lg:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left — Hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Menu size={20} />
      </button>

      {/* Page title — hidden on mobile */}
      <p className="hidden lg:block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {currentPage}
      </p>

      {/* Right — Role switcher + Dark mode */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Role:
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5
              bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>

        {/* Role Badge */}
        <span
          className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            ${
              role === "admin"
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}
        >
          {role === "admin" ? "Admin" : "Viewer"}
        </span>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
