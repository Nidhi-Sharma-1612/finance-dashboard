import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-center px-4">
      <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
        404
      </p>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
        Page not found
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
