import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./Pages/Homepage";
import AddTransaction from "./Pages/Transactions/AddTransaction";
import Navbar from "./Components/Navbar";
import Accounts from "./Pages/Accounts/Accounts";
import Analysis from "./Pages/Analysis";
import TransactionsPage from "./Pages/Transactions/TransactionsPage";
import TransactionPopup from "./Pages/Transactions/Components/TransactionPopup";
import AccountTransactionsPage from "./Pages/Transactions/AccountTransactionsPage";
import SettingsPage from "./Pages/SettingsPage";
import { useAppContext } from "./Context/AppContext"; // ✅ Import Context
import "./App.css";

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const {
    accounts,
    setAccounts,
    transactions,
    setTransactions,
    openEditPopup,
    editingTransaction,
    setEditingTransaction,
    editedTransaction,
    setEditedTransaction,
    saveTransactionChanges,
    deleteTransaction,
  } = useAppContext(); // ✅ Use context

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Homepage accounts={accounts} transactions={transactions} openEditPopup={openEditPopup} />
              </motion.div>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <AddTransaction accounts={accounts} setAccounts={setAccounts} transactions={transactions} setTransactions={setTransactions} />
            }
          />
          <Route
            path="/accounts"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Accounts accounts={accounts} setAccounts={setAccounts} />
              </motion.div>
            }
          />
          <Route
            path="/analytics"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Analysis transactions={transactions} />
              </motion.div>
            }
          />
          <Route
            path="/transactions"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <TransactionsPage transactions={transactions} setTransactions={setTransactions} accounts={accounts} openEditPopup={openEditPopup} />
              </motion.div>
            }
          />
          <Route
            path="/account/:id"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <AccountTransactionsPage accounts={accounts} transactions={transactions} openEditPopup={openEditPopup} />
              </motion.div>
            }
          />
          <Route path="/settings" element={<SettingsPage />}/>
          
        </Routes>
      </AnimatePresence>

      {/* Global TransactionPopup */}
      {editingTransaction && (
        <TransactionPopup
          editedTransaction={editedTransaction}
          setEditedTransaction={setEditedTransaction}
          saveTransactionChanges={saveTransactionChanges}
          deleteTransaction={deleteTransaction}
          closePopup={() => setEditingTransaction(null)}
          accounts={accounts}
        />
      )}

      {location.pathname !== "/add-transaction" && <Navbar />}
    </>
  );
}

export default App;