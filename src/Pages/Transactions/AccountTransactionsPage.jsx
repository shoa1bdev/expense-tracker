import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TransactionItem from "./Components/TransactionItem"

const AccountTransactionsPage = ({ accounts, transactions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all"); // ✅ Filter state

  // Convert id to number and find the account
  const account = accounts.find((acc) => acc.id === Number(id));
  if (!account) {
    return <p className="text-center text-red-500">Account not found</p>;
  }

  // Filter transactions related to this account
  const accountTransactions = transactions.filter((txn) => txn.account === account.name);

  // ✅ Apply filter based on type
  const filteredTransactions = accountTransactions.filter((txn) => {
    if (filterType === "all") return true;
    if (filterType === "income") return txn.amount > 0;
    if (filterType === "expense") return txn.amount < 0;
    if (filterType === "transfer") return txn.type === "transfer";
    return true;
  });
  // Calculate total income and expenses
const totalIncome = accountTransactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
const totalExpense = accountTransactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="mt-6 mx-6 flex flex-col items-center">
      {/* Header with Back Button */}
      <header className="flex items-center gap-3 mb-5 text-white self-start">
        <button onClick={() => navigate(-1)} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">{account.name} Transactions</h1>
      </header>

      {/* Account Balance */}
      <div className="p-4 rounded-lg shadow-md text-center mb-5" style={{backgroundColor: "var(--background)", color:"var(--primary"}}>
  <h2 className="text-2xl font-bold ">₹{account.balance}</h2>
  <p>Balance</p>
  <div className="flex justify-center gap-12 text-sm mt-2">
    <p className="text-white">Income: <span className="text-green-500">₹{totalIncome}</span></p>
    <p className="text-white">Expense: <span className="text-red-500">₹{Math.abs(totalExpense)}</span></p>
  </div>
</div>

<div className="flex justify-between gap-3 mb-4 mx-6 text-black w-full">
  {[
    { type: "all", label: "All", color: "bg-gray-300" },
    { type: "income", label: "Income", color: "bg-green-400" },
    { type: "expense", label: "Expense", color: "bg-red-400" },
    { type: "transfer", label: "Transfer", color: "bg-blue-400" },
  ].map(({ type, label, color }) => (
    <button
      key={type}
      className={`px-3 py-1 rounded-lg border-none text-black transition-all duration-300 ${filterType === type ? color : "bg-gray-200"}`}
      onClick={() => setFilterType(type)}
      style={{ backgroundColor: filterType === type ? "var(--primary)" : "transparent",
        color: filterType === type ? "var(--on-primary)" : "var(--on-background)",
        border: "2px solid var(--primary)"}}
    >
      {label}
    </button>
  ))}
</div>


      {/* Transactions List */}
      <div className="space-y-3 w-full">
  {filteredTransactions.length > 0 ? (
    filteredTransactions.map((txn) => (
      <TransactionItem key={txn.id} transaction={txn} />
    ))
  ) : (
    <p className="text-center text-gray-500">No transactions found.</p>
  )}
</div>
    </div>
  );
};

export default AccountTransactionsPage;
