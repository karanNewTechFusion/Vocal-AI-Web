import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, LayoutDashboard, User, LogOut } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Users", path: "/users", icon: <User size={18} /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-[#14121b] text-white border-r border-gray-800 px-4 py-6 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-10">
        <span className="text-xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
          {collapsed ? "V" : "VocalAI"}
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400">
          <Menu size={20} />
        </button>
      </div>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className="flex items-center gap-3 text-sm hover:text-accent-pink transition">
              {link.icon}
              {!collapsed && link.name}
            </Link>
          </li>
        ))}
      </ul>

      {!collapsed && (
        <button className="flex items-center gap-2 mt-20 text-sm hover:text-red-500 transition">
          <LogOut size={18} /> Logout
        </button>
      )}
    </div>
  );
}
