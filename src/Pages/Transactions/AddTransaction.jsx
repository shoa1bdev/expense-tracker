import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AddTransaction = ({ accounts, setAccounts, transactions, setTransactions }) => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState("income");
  const [amount, setAmount] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [note, setNote] = useState("");
  const [showError, setShowError] = useState(false);
  const [showErrorTwo, setErrorMsgTwo] = useState(false)
  const [showErrorThree, setErrorMsgThree] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.name || "");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const categories = transactionType === "income"
    ? ["Salary", "Investment", "Freelance", "Business"]
    : ["Transportation", "Food & Drinks", "Shopping", "Entertainment", "Bills & Utilities"];

    const handleAmountChange = (e) => {
      let num = e.target.value.replace(/\D/g, "");
      if (num > 100000) {
        num = "100000";
        setShowError(true);
      } else {
        setShowError(false);
      }
      setAmount(num);
    };

    const getCurrentISTDateTime = () => {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const istDate = new Date(now.getTime() + istOffset);
        return istDate.toISOString().slice(0, 16);
      };
    
      const [date, setDate] = useState(getCurrentISTDateTime());
  
      const handleSaveTransaction = () => {
        if (!amount || (!selectedAccount && transactionType !== "transfer") || 
            (transactionType !== "transfer" && !transactionName) || 
            (transactionType !== "transfer" && !selectedCategory)) {
          return;
        }
      
        const numericAmount = Number(amount);
        let updatedAccounts = [...accounts];
        let newTransactions = [];
      
        if (transactionType === "transfer") {
          if (!fromAccount || !toAccount || fromAccount === toAccount) {
            setErrorMsgTwo(true);
            return;
          } else {
            setErrorMsgTwo(false);
          }
          const fromAcc = accounts.find(acc => acc.name === fromAccount);
if (transactionType === "transfer" && fromAcc.balance < numericAmount) {
  setErrorMsgThree(true)
  return;
} else {
  setErrorMsgThree(false)
}
      
          updatedAccounts = updatedAccounts.map((acc) =>
            acc.name === fromAccount ? { ...acc, balance: acc.balance - numericAmount } : acc
          ).map((acc) =>
            acc.name === toAccount ? { ...acc, balance: acc.balance + numericAmount } : acc
          );
      
          const fromTransaction = {
            id: transactions.length + 1,
            name: `Transfer to ${toAccount}`,
            category: "Transfer",
            account: fromAccount,
            amount: -numericAmount,
            note,
            date,
            type: "transfer",
          };
      
          const toTransaction = {
            id: transactions.length + 2,
            name: `Transfer from ${fromAccount}`,
            category: "Transfer",
            account: toAccount,
            amount: numericAmount,
            note,
            date,
            type: "transfer",
          };
      
          newTransactions = [fromTransaction, toTransaction];
      
        } else {
          const transactionAmount = transactionType === "income" ? numericAmount : -numericAmount;
      
          const newTransaction = {
            id: transactions.length + 1,
            name: transactionName,
            category: selectedCategory,
            account: selectedAccount,
            amount: transactionAmount,
            note,
            date,
            type: transactionType,
          };
      
          updatedAccounts = updatedAccounts.map((acc) =>
            acc.name === selectedAccount ? { ...acc, balance: acc.balance + transactionAmount } : acc
          );
      
          newTransactions = [newTransaction];
        }
      
        setTransactions([...transactions, ...newTransactions]);
        setAccounts(updatedAccounts);
        navigate("/");
      };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="add-transaction"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 text-white shadow-lg flex flex-col items-center p-5 rounded-t-3xl overflow-hidden"
      >
        <header className="w-full flex justify-center items-center relative py-3 text-lg font-semibold">
          <button onClick={() => navigate(-1)} className="absolute left-5 text-2xl"><FaTimes /></button>
          <p>Add New</p>
        </header>

        <main className="flex flex-col items-center gap-5 max-w-sm w-full">
          <motion.div className="relative flex w-full rounded-3xl p-1" style={{ backgroundColor: "var(--primary)"}}>
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-1/3 bg-black rounded-3xl"
              animate={{ x: transactionType === "income" ? "0%" : transactionType === "expense" ? "100%" : "200%" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {["income", "expense", "transfer"].map((type) => (
              <button
                key={type}
                className={`relative z-10 flex-1 py-2 rounded-full transition-all duration-300 ${transactionType === type ? "text-white" : "text-black"}`}
                onClick={() => setTransactionType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </motion.div>

          <div className="flex items-center text-5xl font-bold my-10">
            <span className="text-gray-500">₹</span>
            <input
              type="text"
              value={new Intl.NumberFormat("en-IN").format(amount)}
              onChange={handleAmountChange}
              placeholder="0"
              className="text-center bg-transparent border-none focus:outline-none"
              style={{ width: `${Math.max(80, amount.length * 35)}px`, minWidth: "80px", maxWidth: "280px" }}
            />
          </div>
          {showError && <p style={{ color: "var(--error)"}}>Maximum transaction amount is ₹1,00,000</p>}
          {showErrorTwo && <p style={{ color: "var(--error)"}}>Both account can't be same!</p>}
          {showErrorThree && <p style={{ color: "var(--error)"}}>Insufficient balance in the selected account!</p>}

          {transactionType === "transfer" ? (
            <>
              <select className="w-full p-3 rounded-lg shadow-md bg-white text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
                <option value="" disabled>From Account</option>
                {accounts.map((acc) => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
              </select>

              <select className="w-full p-3 rounded-lg shadow-md bg-white text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)" }} value={toAccount} onChange={(e) => setToAccount(e.target.value)}>
                <option value="" disabled>To Account</option>
                {accounts.map((acc) => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
              </select>
            </>
          ) : (
            <>
              <input type="text" placeholder="Transaction Name" className="w-full p-3 rounded-lg shadow-md text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} value={transactionName} onChange={(e) => setTransactionName(e.target.value)} />
              <select className="w-full p-3 rounded-lg shadow-md text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select className="w-full p-3 rounded-lg shadow-md text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                {accounts.map((acc) => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
              </select>
              <input type="text" placeholder="Note (optional)" className="w-full p-3 rounded-lg shadow-md text-lg" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} value={note} onChange={(e) => setNote(e.target.value)} />
            </>
          )}

          <input type="datetime-local" style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)"}} className="date w-full p-3 rounded-xl shadow-md text-lg" value={date} onChange={(e) => setDate(e.target.value)} />
          <motion.button className="w-full py-3 rounded-full text-lg hover:bg-gray-800" style={{ backgroundColor: "var(--primary)", color:"var(--on-primary)"}} onClick={handleSaveTransaction}>
            Save Transaction
          </motion.button>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddTransaction;
