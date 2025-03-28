import { FaChevronRight } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)", color: "var(--on-background)" }}>
      {/* Header */}
      <header className="p-6 text-xl font-bold" style={{ backgroundColor: "", color: "var(--on-background)" }}>
        Settings
      </header>

      {/* Settings List */}
      <div className="p-4 space-y-4">
        {/* Account Settings */}
        <Section title="Account">
          <SettingItem label="Profile" />
          <SettingItem label="Change Password" />
        </Section>

        {/* App Preferences */}
        <Section title="Preferences">
          <SettingToggle label="Dark Mode" />
          <SettingToggle label="Enable Notifications" />
        </Section>

        {/* Support */}
        <Section title="Support">
          <SettingItem label="Help & Support" />
          <SettingItem label="Privacy Policy" />
          <SettingItem label="Terms & Conditions" />
        </Section>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="p-4 rounded-lg shadow-md">
    <h2 className="text-sm font-semibold mb-3 text-[var(--on-background)]">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

// Reusable Setting Item Component
const SettingItem = ({ label }) => (
  <div className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-[var(--primary)] transition duration-200 cursor-pointer">
    <span>{label}</span>
    <FaChevronRight />
  </div>
);

// Reusable Toggle Switch Component
const SettingToggle = ({ label }) => (
  <div className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-[var(--primary)] transition duration-200 cursor-pointer">
    <span>{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-[var(--primary)] peer-checked:after:translate-x-5 transition-all after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  </div>
);

export default SettingsPage;
