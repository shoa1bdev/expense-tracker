import { useState } from "react";
import TransactionsList from "./Components/TransactionsList";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";

const TransactionsPage = ({ transactions, setTransactions, accounts, openEditPopup }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category"); // ✅ Get category from URL
  const [selectedAccount, setSelectedAccount] = useState("All");

  // Filter transactions based on account and category
  const filteredTransactions = transactions.filter((t) => {
    const matchesAccount = selectedAccount === "All" || t.account === selectedAccount;
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    return matchesAccount && matchesCategory;
  });

  return (
    <div className="p-5 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-3 text-lg font-semibold">
        <button onClick={() => navigate(-1)} className="text-2xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Transactions</h2>
      </header>

      {/* Account Filter Dropdown */}
      <div className="my-4">
        <label className="block text-sm font-bold mb-2">Filter by Account</label>
        <select
          className="w-full p-2 border rounded-md"
          style={{ borderColor: "var(--primary)"}}
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option style={{ backgroundColor: "var(--primary)", color:"black"}} value="All">All Accounts</option>
          {accounts.map((account) => (
            <option className="text-black" style={{ backgroundColor: "var(--primary)"}} key={account.id} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter Display & Clear Button */}
      {selectedCategory && (
        <div className="mb-4 flex justify-between items-center bg-gray-700 p-2 rounded">
          <span>Filtered by: <strong>{selectedCategory}</strong></span>
          <button className="text-red-400" onClick={() => navigate("/transactions")}>Clear</button>
        </div>
      )}

      {/* Transactions List */}
      <TransactionsList transactions={filteredTransactions} openEditPopup={openEditPopup} />
    </div>
  );
};

export default TransactionsPage;
