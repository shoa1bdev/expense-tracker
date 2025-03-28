import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const categoryColors = [
  "#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336", "#00BCD4"
];

const Analysis = () => {
  const { transactions } = useAppContext();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedTab, setSelectedTab] = useState("expense");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // ✅ Popup state
  const navigate = useNavigate();

  const formattedDate = useMemo(() => `${year}-${String(month + 1).padStart(2, "0")}`, [month, year]);

  const filteredTransactions = useMemo(() => 
    transactions.filter((t) => t.date.startsWith(formattedDate) && t.type !== "transfer"),
    [transactions, formattedDate]
  );

  const aggregatedTransactions = useMemo(() => {
    const categoryMap = new Map();
    filteredTransactions.forEach((t) => {
      const type = t.amount < 0 ? "expense" : "income";
      const absAmount = Math.abs(t.amount);
      if (!categoryMap.has(t.category)) {
        categoryMap.set(t.category, { name: t.category, amount: 0, type });
      }
      categoryMap.get(t.category).amount += absAmount;
    });

    return Array.from(categoryMap.values()).map((item, index) => ({
      ...item,
      color: categoryColors[index % categoryColors.length] 
    }));
  }, [filteredTransactions]);

  const expenseData = useMemo(() => aggregatedTransactions.filter((t) => t.type === "expense"), [aggregatedTransactions]);
  const incomeData = useMemo(() => aggregatedTransactions.filter((t) => t.type === "income"), [aggregatedTransactions]);

  const displayedData = selectedTab === "expense" ? expenseData : incomeData;
  const totalAmount = displayedData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-4 bg-gray-100 min-h-screen dark">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}>
          <FiChevronLeft size={24} />
        </button>
        
        {/* ✅ Clickable Month-Year Button */}
        <button className="text-lg font-semibold" onClick={() => setIsDatePickerOpen(true)}>
          {months[month]} {year}
        </button>

        <button onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}>
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* ✅ Month-Year Picker Popup */}
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
          <div className="bg-white p-5 rounded shadow-md w-64">
            <h3 className="text-center text-lg font-bold">Select Month & Year</h3>
            
            {/* Month Dropdown */}
            <select
              className="w-full p-2 border rounded mt-3"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              className="w-full p-2 border rounded mt-3"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              {[...Array(5)].map((_, i) => {
                const y = new Date().getFullYear() - i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </select>

            {/* Close Button */}
            <div className="flex justify-between mt-4">
              <button className="text-gray-600" onClick={() => setIsDatePickerOpen(false)}>Cancel</button>
              <button className="text-blue-600 font-bold" onClick={() => setIsDatePickerOpen(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Income & Expense Tabs */}
      <div className="relative flex border-b mt-4">
        <button
          className={`flex-1 py-2 text-center ${selectedTab === "income" ? "border-b-2 border-green-500 font-bold" : ""}`}
          onClick={() => setSelectedTab("income")}
        >
          Income
        </button>
        <button
          className={`flex-1 py-2 text-center ${selectedTab === "expense" ? "border-b-2 border-red-500 font-bold" : ""}`}
          onClick={() => setSelectedTab("expense")}
        >
          Expense
        </button>
      </div>

      {/* No Transactions Message */}
      {displayedData.length === 0 ? (
        <div className="text-center text-gray-500 mt-6">No transactions this month.</div>
      ) : (
        <>
          {/* Pie Chart */}
          <div className="w-full h-64 my-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={displayedData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} label>
                  {displayedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color}  stroke={{color: "var(--primary)"}} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Transactions List */}
          <div className="mt-4 bg-white p-4 rounded shadow" style={{ backgroundColor: "var(--background)"}}>
            <h3 className="text-lg font-semibold mb-2">{selectedTab === "income" ? "Income Sources" : "Expenses"}</h3>
            {displayedData.map((item, index) => (
              <button
                key={index}
                className="flex justify-between py-2 w-full text-left hover:bg-gray-100"
                onClick={() => navigate(`/transactions?category=${item.name}`)}
              >
                <span className="underline text-white">{item.name}</span>
                <span className="font-semibold">₹{item.amount}</span>
              </button>
            ))}
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;
