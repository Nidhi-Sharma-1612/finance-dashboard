# FinTrack — Finance Dashboard

A clean, interactive finance dashboard built as part of a frontend developer internship assignment.

## 🚀 Live Demo

🔗 [https://finance-dashboard-beige-sigma.vercel.app/](https://finance-dashboard-beige-sigma.vercel.app/)

## 🛠️ Tech Stack

| Technology            | Purpose             |
| --------------------- | ------------------- |
| React 18 + TypeScript | Core framework      |
| Vite                  | Build tool          |
| Tailwind CSS v3       | Styling             |
| Recharts              | Data visualizations |
| React Router v6       | Client-side routing |
| Lucide React          | Icons               |
| Framer Motion         | Page transitions    |

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18 or above
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/finance-dashboard.git

# Navigate into the project
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Navbar, Layout shell
│   └── PageTransition  # Framer motion wrapper
├── context/            # Global state (AppContext, AppProvider, useApp)
├── data/               # Mock transaction data
├── pages/
│   ├── Dashboard/      # Summary cards + charts
│   ├── Transactions/   # Table, filters, modal
│   └── Insights/       # Insight cards + charts
├── types/              # TypeScript interfaces
└── utils/              # Helper and insight functions
```

## ✨ Features

### Dashboard

- Summary cards showing Total Balance, Income, and Expenses
- Area chart for income vs expense trend over time
- Donut chart for spending breakdown by category

### Transactions

- Full transaction table with date, amount, category, type
- Search by description
- Filter by category and type
- Sort by date or amount
- Admin role: Add, edit, and delete transactions with form validation

### Insights

- Savings rate with contextual advice
- Top spending category detection
- Month-over-month expense change
- Most active month
- Ranked category list with progress bars
- Monthly income vs expenses vs savings bar chart

### Role Based UI

Switch roles using the dropdown in the top navbar:

| Feature            | Viewer | Admin |
| ------------------ | ------ | ----- |
| View all data      | ✅     | ✅    |
| Add transaction    | ❌     | ✅    |
| Edit transaction   | ❌     | ✅    |
| Delete transaction | ❌     | ✅    |

### Additional Features

- Dark mode with persistence
- Export filtered transactions as CSV
- localStorage data persistence
- Responsive design (mobile + desktop)
- Smooth page transitions
- Empty state handling throughout
- 404 page

## 📊 Mock Data

The app ships with 40 mock transactions spanning January to June 2024 across categories including Salary, Freelance, Food & Dining, Shopping, Healthcare, Bills & Utilities, Transportation, Entertainment, and Investment.

## 🎨 Design Decisions

- Chose React with TypeScript over Next.js as this is a pure frontend assignment with no SSR or API route requirements
- Used Context API over Redux or Zustand to keep the solution simple and dependency-light
- Used Tailwind CSS v3 for fast, consistent, and responsive styling without custom CSS overhead
- Kept all data in localStorage so state persists across page refreshes without a backend
- Separated context into multiple files (AppContext, AppProvider, useApp, defaultFilters) to satisfy React fast refresh requirements and maintain clean separation of concerns
