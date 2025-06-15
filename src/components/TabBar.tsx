
import { Home, DollarSign, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { label: "Home", icon: Home, route: "/home" }, // changed from "/" to "/home"
  { label: "Estimate", icon: DollarSign, route: "/estimate" },
  { label: "Profile", icon: User, route: "/profile" },
  { label: "Nearby Kiosks", icon: MapPin, route: "/kiosks" }
];

const TabBar = ({ selected = 0 }: { selected?: number }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-sm z-40 flex sm:static sm:shadow-none sm:border-0 sm:mt-8 sm:justify-center">
      <div className="flex justify-between w-full max-w-md mx-auto">
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = selected === idx;
          return (
            <button
              key={tab.label}
              className={`group flex flex-col items-center flex-1 px-0 py-2 transition text-xs font-medium ${
                isActive ? "text-blue-500" : "text-gray-400"
              } hover:text-blue-500 focus:outline-none`}
              tabIndex={0}
              onClick={() => navigate(tab.route)}
              type="button"
            >
              <Icon
                size={26}
                strokeWidth={2.3}
                className={`mb-1 ${isActive ? "" : "opacity-70"} group-hover:scale-110 transition`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
