import { FaUser, FaBell } from "react-icons/fa6";

const Header = () => (
  <header className="flex justify-between items-center px-6 mt-2" >
    <div className="flex items-center gap-3">
      <div className="p-3 bg-gray-200 rounded-[40%] flex justify-center items-center text-xl" style={{ backgroundColor: "var(--primary)"}}>
        <FaUser style={{ color: "var(--background)" }} />
      </div>
      <div className="text-gray-600 text-sm leading-none" style={{ color: "var(--on-background)" }}>
        <p className="text-sm">Hello There!</p>
        <p className="text-xl font-semibold"></p>
      </div>
    </div>
  </header>
);

export default Header;
