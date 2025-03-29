import { Link, useLocation } from "react-router-dom";
import { FaHouse, FaChartBar, FaPlus, FaCreditCard, FaGear } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation(); // ✅ Get current route

  const navItems = [
    { path: "/", icon: <FaHouse />, label: "Home" },
    { path: "/analytics", icon: <FaChartBar />, label: "Analytics" },
    { path: "/add-transaction", icon: <FaPlus />, label: "Add" },
    { path: "/accounts", icon: <FaCreditCard />, label: "Accounts" },
    { path: "/settings", icon: <FaGear />, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 pb-5 w-full h-[9.5vh] bg-gray-200 flex justify-center items-center shadow-md" style={{ backgroundColor: "var(--background)" }}>
      <ul className="flex justify-between items-center w-full h-full text-2xl relative px-6">
        {navItems.map(({ path, icon, label }, index) => (
          <li key={index} className="flex-1 flex justify-center">
            <Link
              to={path}
              className={`transition-transform transform ${
                index === 2
                  ? "p-3 rounded-full shadow-lg hover:scale-110"
                  : "hover:scale-110"
              }`}
              style={{
                color: index === 2 ? "var(--on-primary)" : location.pathname === path ? "var(--primary)" : "var(--on-background)",
                backgroundColor: index === 2 ? "var(--primary)": "",
              }}
              title={label}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
