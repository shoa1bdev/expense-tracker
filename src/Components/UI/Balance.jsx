import { FaEye } from "react-icons/fa";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Balance = ({ balance, transactions = [] }) => {
  // Get current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
  const navigate = useNavigate();
  // Memoize transactions filtering & calculations
  const { income, expenses } = useMemo(() => {
    // Filter transactions for the current month, excluding transfers
    const monthlyTransactions = transactions.filter((t) => {
      if (!t.date) return false;
      const [year, month] = t.date.split("T")[0].split("-").map(Number);
      return year === currentYear && month === currentMonth && t.type !== "transfer";
    });

    // Calculate total income and expenses
    return monthlyTransactions.reduce(
      (totals, t) => {
        if (t.amount > 0) totals.income += t.amount;
        else totals.expenses += Math.abs(t.amount);
        return totals;
      },
      { income: 0, expenses: 0 }
    );
  }, [transactions]);

  return (
    <div className="text-center pb-6 pt-8 px-6">
      {/* Balance Header */}
      <div className="flex justify-center items-center gap-2 text-gray-600 mb-3" onClick={() => navigate("/accounts")} style={{ color: "var(--on-background)" }}>
        <p className="text-lg font-medium">Total Balance</p>
        <FaEye />
      </div>

      {/* Balance Amount */}
      <h1 style={{ color: "var(--on-background)" }} className="text-4xl font-bold text-gray-800" onClick={() => navigate("/accounts")}>₹{balance.toLocaleString()}</h1>

      {/* Income & Expense Summary */}
      <div className="mt-6 space-y-2" onClick={() => navigate("/analytics")} style={{ color: "var(--on-background)" }} >
        <p className="mx-2">This Month:</p>
        <div className="flex justify-between mx-auto w-3/5 md:w-2/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p>Income</p>
          </div>
          <p className="font-semibold">₹{income.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mx-auto w-3/5 md:w-2/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <p>Expense</p>
          </div>
          <p className="font-semibold">₹{expenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
