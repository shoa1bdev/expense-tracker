import { useState } from "react";
import ColorPicker from "./ColorPicker";

const EditAccountForm = ({ index, account, accounts, setAccounts, setEditing }) => {
  const [editedAccount, setEditedAccount] = useState({
    ...account,
    balance: account.balance || 0, // Ensure balance is set
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    if (!editedAccount.name.trim() || editedAccount.balance === "") {
      setErrorMsg("All fields must be filled.");
      return;
    }

    const updatedBalance =
      editedAccount.type === "Loan" ? -Math.abs(Number(editedAccount.balance)) : Number(editedAccount.balance);

    const updatedAccounts = [...accounts];
    updatedAccounts[index] = {
      ...editedAccount,
      balance: updatedBalance,
    };
    setAccounts(updatedAccounts);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full text-black">
      <input
        type="text"
        name="name"
        value={editedAccount.name}
        onChange={handleEditChange}
        className="border p-2 rounded w-full"
        placeholder="Account Name"
      />
      <input
        type="number"
        name="balance"
        value={editedAccount.balance}
        onChange={handleEditChange}
        className="border p-2 rounded w-full"
        placeholder="Balance"
      />

      <select
        name="type"
        value={editedAccount.type}
        onChange={handleEditChange}
        className="border p-2 rounded w-full"
      >
        <option value="Bank">Bank</option>
        <option value="Wallet">Wallet</option>
        <option value="Cash">Cash</option>
        <option value="Loan">Loan</option>
      </select>

      {/* Color Picker */}
      <ColorPicker
        selectedColor={editedAccount.color}
        setSelectedColor={(color) => setEditedAccount((prev) => ({ ...prev, color }))}
      />

      {/* Error Message */}
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      {/* Save Button */}
      <button onClick={saveEdit} className="w-full bg-black text-white py-2 rounded-lg">
        Save Changes
      </button>
    </div>
  );
};

export default EditAccountForm;
