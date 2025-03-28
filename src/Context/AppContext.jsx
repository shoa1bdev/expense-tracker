import { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Wallet", balance: 100 },
    { id: 2, name: "Bank", balance: 5000 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, name: "Bought food", category: "Food", account: "Wallet", amount: -50, date: "2025-03-25T10:40" },
    { id: 2, name: "Salary", category: "Salary", account: "Bank", amount: 5000, date: "2025-03-24T09:00" }
  ]);

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null);

  // Function to open edit popup
  const openEditPopup = (transaction) => {
    setEditingTransaction(transaction);
    setEditedTransaction({ ...transaction });
  };

  // Function to save transaction changes
  const saveTransactionChanges = () => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === editedTransaction.id ? editedTransaction : t))
    );
    setEditingTransaction(null);
  };

  // Function to delete transaction
  const deleteTransaction = () => {
    if (!editingTransaction) return;

    setTransactions((prev) => prev.filter((t) => t.id !== editingTransaction.id));

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.name === editingTransaction.account
          ? { ...account, balance: account.balance - editingTransaction.amount }
          : account
      )
    );

    setEditingTransaction(null);
  };

  return (
    <AppContext.Provider
      value={{
        accounts,
        setAccounts,
        transactions,
        setTransactions,
        editingTransaction,
        setEditingTransaction,
        editedTransaction,
        setEditedTransaction,
        openEditPopup,
        saveTransactionChanges,
        deleteTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};