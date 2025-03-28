import { useMemo } from "react";
import { useAppContext } from "../Context/AppContext";
import Transactions from "../Components/Transactions";
import Header from "../Components/Header";
import Balance from "../Components/UI/Balance";
import SavingGoals from "../Components/Goals/SavingGoals";

const Homepage = () => {
  const { accounts, transactions, openEditPopup } = useAppContext();

  // Memoized total balance to avoid recalculations on re-renders
  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, account) => (account.type === "Loan" ? sum : sum + account.balance), 0);
  }, [accounts]);

  return (
    <div className="pt-6 pb-16" style={{ backgroundColor: "var(--background)", color: "var(--on-background)" }}>
      <Header />
      <Balance balance={totalBalance} transactions={transactions} />
      <SavingGoals />
      <Transactions transactions={transactions} openEditPopup={openEditPopup} />
    </div>
  );
};

export default Homepage;