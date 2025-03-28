import { FaWallet, FaUtensils, FaShoppingCart, FaMoneyBillWave, FaCar, FaGift, FaHeart, FaExchangeAlt } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils />,
  Shopping: <FaShoppingCart />,
  Salary: <FaMoneyBillWave />,
  Transport: <FaCar />,
  Gifts: <FaGift />,
  Health: <FaHeart />,
  Transfer: <FaExchangeAlt />,
  Default: <FaWallet />,
};

const TransactionItem = ({ transaction, openEditPopup }) => {
  return (
    <div
      className="flex justify-between p-3 shadow-md rounded-lg hover:shadow-lg cursor-pointer transition-all"
      onClick={() => openEditPopup(transaction)}
      style={{ backgroudColor: "var(--background)",}}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 text-gray-600 flex items-center justify-center rounded-full text-xl" style={{ color: "var(--primary)"}}>
          {categoryIcons[transaction.category] || categoryIcons.Default}
        </div>
        <div>
          <p className="font-semibold">{transaction.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(transaction.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
      <p className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
        ₹{transaction.amount.toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionItem;
