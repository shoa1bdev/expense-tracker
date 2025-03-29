import { memo, useMemo, useCallback } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

const TransactionPopup = ({ 
  editedTransaction, 
  setEditedTransaction, 
  saveTransactionChanges, 
  deleteTransaction, 
  closePopup, 
  accounts 
}) => {
  if (!editedTransaction) return null; // ✅ Prevents unnecessary rendering

  // Memoized categories to avoid re-creating the array on every render
  const categories = useMemo(() => ["Food", "Salary", "Entertainment", "Transport", "Shopping", "Bills", "Others", "Transfer"], []);

  // Formats date for datetime-local input
  const formatDateForInput = useCallback((dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }, []);

  // Handles input changes efficiently
  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [setEditedTransaction]);

  // Closes popup and resets the edited transaction
  const handleClosePopup = useCallback(() => {
    setEditedTransaction(null);
    closePopup();
  }, [setEditedTransaction, closePopup]);

  // Check if transaction is of type "Transfer"
  const isTransfer = editedTransaction.category === "Transfer";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-100"  style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <div className=" p-6 rounded-lg shadow-xl w-[90vw] max-w-md relative" style={{ backgroundColor: "var(--primary)"}}>
        {/* Close Button */}
        <button onClick={handleClosePopup} className="absolute top-3 right-3 text-gray-600">
          <FaTimes size={18} />
        </button>

        <h2 className="text-lg font-bold mb-4 text-center text-black">Edit Transaction</h2>

        {/* If it's a transfer, only show From Account, To Account, and Date */}
        {isTransfer ? (
          <>
            {/* From Account Dropdown */}
            <select
              name="fromAccount"
              value={editedTransaction.fromAccount || accounts[0]?.name} 
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.name}>{account.name}</option>
              ))}
            </select>

            {/* To Account Dropdown */}
            <select
              name="toAccount"
              value={editedTransaction.toAccount || accounts[1]?.name} 
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.name}>{account.name}</option>
              ))}
            </select>

            {/* Date Picker */}
            <input
              type="datetime-local"
              name="date"
              value={formatDateForInput(editedTransaction.date)}
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            />
          </>
        ) : (
          <>
            {/* Transaction Name */}
            <span className="span">Transaction Name:</span>
            <input
              type="text"
              name="name"
              value={editedTransaction.name || ""}
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
              placeholder="Transaction Name"
            />

            {/* Amount */}
            <span className="span">Amount:</span>
            <input
              type="number"
              name="amount"
              value={editedTransaction.amount || ""}
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
              placeholder="Amount"
            />

            {/* Date Picker */}
            <span className="span">Date & Time:</span>
            <input
              type="datetime-local"
              name="date"
              value={formatDateForInput(editedTransaction.date)}
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            />

            {/* Category Dropdown */}
            <span className="span">Category:</span>
            <select
              name="category"
              value={editedTransaction.category || categories[0]} 
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Account Dropdown */}
            <span className="span">Account:</span>
            <select
              name="account"
              value={editedTransaction.account || accounts[0]?.name} 
              onChange={handleEditChange}
              className="border p-2 rounded w-full mb-3"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.name}>{account.name}</option>
              ))}
            </select>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-3">
          <button 
            onClick={deleteTransaction} 
            className="w-1/2 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete
          </button>
          <button 
            onClick={saveTransactionChanges} 
            className="w-1/2 bg-black text-white py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Memoize component to prevent re-rendering unless props change
export default memo(TransactionPopup);
