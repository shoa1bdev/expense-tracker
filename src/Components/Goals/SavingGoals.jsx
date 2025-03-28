import { FaPlane, FaLaptop } from "react-icons/fa";

const SavingsGoals = () => {
  const goals = [
    { id: 1, icon: <FaPlane />, name: "Trip to Japan", saved: 50, target: 200, progress: 25 },
    { id: 2, icon: <FaLaptop />, name: "Buy MacBook", saved: 50, target: 200, progress: 25 },
    { id: 3, icon: <FaLaptop />, name: "Buy MacBook", saved: 50, target: 200, progress: 25 },
  ];

  return (
    <div className="mt-5 px-6" style={{ backgroundColor: "var(--background)", color: "var(--on-background)" }}>
  {/* Header */}
  <div className="flex justify-between items-center">
    <h3 className="text-lg font-semibold" style={{ color: "var(--on-background)" }}>Savings Goals</h3>
    <a href="#" className="text-sm text-gray-600" style={{ color: "var(--on-background)" }}>See all</a>
  </div>

  {/* Filter Buttons */}
  <div className="flex gap-3 my-3">
    <button className="px-4 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}>Progress</button>
    <button className="px-4 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--surface)", color: "var(--on-background)" }}>Completed</button>
  </div>

  {/* Goals - FIXED SCROLLING */}
  <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
    {goals.map(({ id, icon, name, saved, target, progress }) => (
      <div key={id} className="p-4 rounded-lg shadow-md flex flex-col gap-3 w-48 flex-shrink-0" style={{ backgroundColor: "var(--background)", color: "var(--on-background)" }}>
        <div className="text-2xl" style={{ color: "var(--primary)" }}>{icon}</div>
        <p className="font-medium" style={{ color: "var(--on-background)" }}>{name}</p>
        <div className="flex justify-between text-sm" style={{ color: "var(--on-background)" }}>
          <p>${saved}</p>
          <p>${target}</p>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: "var(--primary)" }}></div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default SavingsGoals;
