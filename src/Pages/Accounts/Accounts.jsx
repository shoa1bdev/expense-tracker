import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AccountsList from "./Components/AccountsList";
import AddAccountModal from "./Components/AddAccountModal";


const pastelColors = ["#5EC2A8", "#FF8FA3", "#8AB6F9", "#FFD782", "#C28FFF", "#FFFFFF"];

const Accounts = ({ accounts, setAccounts }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center p-5 relative">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-3 text-lg font-semibold text-white">
        <h2>Your Accounts</h2>
      </header>

      {/* Accounts List */}
      <AccountsList accounts={accounts} setAccounts={setAccounts} pastelColors={pastelColors} />

      {/* Add Account Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="w-full max-w-md bg-black text-white py-3 mt-6 rounded-lg flex items-center justify-center gap-2"
        style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)"}}
      >
        <FaPlus /> Add New Account
      </button>

      {/* Add Account Modal */}
      {isAdding && <AddAccountModal setAccounts={setAccounts} setIsAdding={setIsAdding} pastelColors={pastelColors} />}
    </div>
  );
};

export default Accounts;
