import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ColorPicker from "./ColorPicker";

const AddAccountModal = ({ setAccounts, setIsAdding, pastelColors }) => {
  const [newAccount, setNewAccount] = useState({
    name: "",
    balance: "",
    type: "Bank", // Default type
    color: pastelColors[0],
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    if (!newAccount.name.trim()) newErrors.name = "Account name is required.";
    if (newAccount.balance === "" || isNaN(newAccount.balance)) {
      newErrors.balance = "Balance must be a valid number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAccount = () => {
    if (!validateFields()) return;

    setAccounts((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        ...newAccount, 
        balance: newAccount.type === "Loan" ? -Math.abs(Number(newAccount.balance)) : Number(newAccount.balance),
      },
    ]);

    // Reset form fields
    setNewAccount({ name: "", balance: "", type: "Bank", color: pastelColors[0] });
    setErrors({});
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <div className="p-6 rounded-lg shadow-lg w-4/5 max-w-md relative transition-all duration-300" style={{ backgroundColor: "var(--primary)", color: "var(--onBackground)" }}>
        {/* Close Button */}
        <button 
          onClick={() => setIsAdding(false)} 
          className="absolute top-3 left-3 hover:scale-110 transition-transform"
          style={{ color: "var(--on-background)" }}
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-center">Add New Account</h2>

        {/* Account Name */}
        <input
          type="text"
          name="name"
          value={newAccount.name}
          onChange={(e) => setNewAccount((prev) => ({ ...prev, name: e.target.value }))}
          className="border p-2 rounded w-full mb-2"
          style={{ borderColor: errors.name ? "var(--error)" : "var(--on-background)"}}
          placeholder="Account Name"
        />
        {errors.name && <p style={{ color: "var(--error)" }} className="text-sm">{errors.name}</p>}

        {/* Balance Input */}
        <input
          type="number"
          name="balance"
          value={newAccount.balance}
          onChange={(e) => setNewAccount((prev) => ({ ...prev, balance: e.target.value }))}
          className="border p-2 rounded w-full mb-2"
          style={{ borderColor: errors.balance ? "var(--error)" : "var(--on-background)", }}
          placeholder="Balance"
        />
        {errors.balance && <p style={{ color: "var(--error)" }} className="text-sm">{errors.balance}</p>}

        {/* Account Type Dropdown */}
        <select
          className="border p-2 rounded w-full mb-2"
          value={newAccount.type}
          onChange={(e) => setNewAccount((prev) => ({ ...prev, type: e.target.value }))}
          style={{ backgroundColor: "var(--on-background)", color: "var(--on-primary)" }}
        >
          <option value="Bank">Bank</option>
          <option value="Wallet">Wallet</option>
          <option value="Cash">Cash</option>
          <option value="Loan">Loan</option>
        </select>

        {/* Add Account Button */}
        <button 
          onClick={addAccount} 
          className="w-full py-2 rounded mt-4 transition-all"
          style={{ backgroundColor: "var(--background)", color: "var(--on-background)" }}
        >
          Add Account
        </button>
      </div>
    </div>
  );
};

export default AddAccountModal;
