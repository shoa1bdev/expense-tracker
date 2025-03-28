import { createContext, useContext, useEffect, useState } from "react";

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Load data from localStorage or use default values
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem("accounts");
    return savedAccounts ? JSON.parse(savedAccounts) : [
      { id: 1, name: "Wallet", balance: 0 },
      { id: 2, name: "Bank", balance: 0 }
    ];
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null);

  // Save data to localStorage whenever accounts or transactions change
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

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

  // Function to delete transaction and adjust account balance
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

  // Function to add a new transaction and update account balance
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.name === newTransaction.account
          ? { ...account, balance: account.balance + newTransaction.amount }
          : account
      )
    );
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
        deleteTransaction,
        addTransaction, // ✅ Now transactions can be added!
      }}
    >
      {children}
    </AppContext.Provider>
  );
};