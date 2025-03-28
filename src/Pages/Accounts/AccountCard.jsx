import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditAccountForm from "./Components/EditAccountForm";

const AccountCard = ({ index, account, accounts, setAccounts, pastelColors }) => {
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const backgroundColor = account.color || pastelColors[index % pastelColors.length];

  const deleteAccount = () => {
    setAccounts(accounts.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
    style={{ backgroundColor }}
    className="relative flex flex-col gap-4 p-4 rounded-lg text-black shadow-sm overflow-visible cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md bg-white"
    >
      {editing ? (
        <EditAccountForm index={index} account={account} accounts={accounts} setAccounts={setAccounts} setEditing={setEditing} />
      ) : (
        <>
          <div className="flex justify-between items-center relative">
            <div>
              <p className="text-xs font-medium text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-gray-800">₹{account.balance.toLocaleString()}</p>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FaEllipsisV />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md py-1 text-sm border border-gray-100 z-10">
                  <button
                    onClick={() => {
                      setEditing(true);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Edit Account
                  </button>
                  <button
                    onClick={() => {
                      deleteAccount();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/account/${account.id}`);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    View Transactions
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-md font-medium text-gray-700">{account.name}</p>
        </>
      )}
    </div>
  );
};

export default AccountCard;
