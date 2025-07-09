import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Menu,
  LayoutDashboard,
  BookOpenCheck,
  BarChart,
  Mic,
  CreditCard,
  LogOut,
} from "lucide-react";
import { logout } from "../redux/slices/authSlice"; // ✅ adjust path if needed

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Practice", path: "/practice", icon: BookOpenCheck },
  // { name: "Progress", path: "/progress", icon: BarChart },
  { name: "Recordings", path: "/recordings", icon: Mic },
  { name: "Subscription", path: "/subscription", icon: CreditCard },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // clears Redux state
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login"); // redirect to login
  };

  return (
    <div
      className={`h-screen bg-[#14121b] text-white border-r border-gray-800 py-6 transition-all duration-300 ${
        collapsed ? "w-16 px-2" : "w-64 px-4"
      }`}
    >
      <div className="flex items-center justify-between mb-10">
        <span className="text-xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
          {collapsed ? "V" : "VocalAI"}
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400">
          <Menu size={20} />
        </button>
      </div>

      <ul className="space-y-3">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;

          return (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center ${
                  collapsed ? "justify-center" : ""
                } gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white shadow-md border border-accent-pink/40"
                    : "text-gray-400 hover:text-white hover:bg-dark/50"
                }`}
              >
                <Icon size={collapsed ? 24 : 18} />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {!collapsed ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-20 text-sm text-red-500 hover:text-white hover:bg-red-600 px-3 py-2 rounded-xl transition"
        >
          <LogOut size={18} /> Logout
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="mt-20 flex justify-center w-full text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-xl transition"
        >
          <LogOut size={24} />
        </button>
      )}
    </div>
  );
}
