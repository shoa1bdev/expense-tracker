import { Link } from "react-router-dom";
import { useMemo } from "react";
import TransactionItem from "../Pages/Transactions/Components/TransactionItem"; // Import TransactionItem

const Transactions = ({ transactions = [], openEditPopup }) => {
  // Sort and group transactions using useMemo to prevent unnecessary re-renders
  const groupedTransactions = useMemo(() => {
    if (!transactions.length) return {};

    // Sort transactions by latest date and time
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Group transactions by date
    return sortedTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      if (!acc[date]) acc[date] = [];
      acc[date].push(transaction);
      return acc;
    }, {});
  }, [transactions]);

  return (
    <div className="mt-5 px-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <Link to="/transactions" className="text-sm text-gray-600 hover:underline">
          See all
        </Link>
      </div>

      {/* Transaction List */}
      <div className="mt-3 mb-8 space-y-5">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date}>
            <p className="text-sm font-semibold text-gray-500">{date}</p>
            <div className="flex flex-col gap-2 mt-2">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  openEditPopup={openEditPopup} // ✅ Pass edit function
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
