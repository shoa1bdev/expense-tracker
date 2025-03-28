import { useMemo, useState } from "react";
import TransactionItem from "./TransactionItem";
import { FaFilter, FaTimes } from "react-icons/fa";

const TransactionsList = ({ transactions, openEditPopup }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const categories = [...new Set(transactions.map(txn => txn.category))];

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter((txn) => {
      const categoryMatch = categoryFilter === "all" || txn.category === categoryFilter;
      const typeMatch = typeFilter === "all" || (typeFilter === "income" ? txn.amount > 0 : txn.amount < 0);
      return categoryMatch && typeMatch;
    });
  }, [sortedTransactions, categoryFilter, typeFilter]);

  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, transaction) => {
      const dateKey = new Date(transaction.date).toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(transaction);
      return acc;
    }, {});
  }, [filteredTransactions]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en-US", { month: "short" })} ${dateObj.getFullYear()}`;
  };

  return (
    <div className="w-full text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter size={18} />
        </button>
      </div>

      {showFilters && (
        <div className="p-4 mb-4">
          <div className="flex justify-between mb-2">
            <h3 className="text-md font-semibold">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <FaTimes size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-md ${categoryFilter === category ? "bg-blue-500" : "bg-gray-600"}`}
                onClick={() => setCategoryFilter(categoryFilter === category ? "all" : category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`px-3 py-1 rounded-md ${typeFilter === "income" ? "bg-green-500" : "bg-gray-600"}`}
              onClick={() => setTypeFilter(typeFilter === "income" ? "all" : "income")}
            >
              Income
            </button>
            <button
              className={`px-3 py-1 rounded-md ${typeFilter === "expense" ? "bg-red-500" : "bg-gray-600"}`}
              onClick={() => setTypeFilter(typeFilter === "expense" ? "all" : "expense")}
            >
              Expense
            </button>
          </div>
        </div>
      )}

      {Object.entries(groupedTransactions).map(([dateKey, transactions]) => (
        <div key={dateKey} className="mb-6">
          <h3 className="text-md font-semibold mt-4">{formatDate(dateKey)}</h3>
          <div className="flex flex-col gap-3">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} openEditPopup={openEditPopup} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;