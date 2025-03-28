import AccountCard from "../AccountCard";

const AccountsList = ({ accounts, setAccounts, pastelColors }) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          index={index}
          account={account}
          accounts={accounts}
          setAccounts={setAccounts}
          pastelColors={pastelColors}
        />
      ))}
    </div>
  );
};

export default AccountsList;
