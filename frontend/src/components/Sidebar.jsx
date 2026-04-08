import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Layers,
  Calendar,
  Newspaper,
  Image,
  Trophy,
  Award,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const links = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Members", url: "/data/members", icon: Users },
  { title: "Exectives", url: "/data/exectives", icon: UserCheck },
  { title: "Programs", url: "/data/programs", icon: Layers },
  { title: "Events", url: "/data/events", icon: Calendar },
  { title: "News & Updates", url: "/data/news", icon: Newspaper },
  { title: "Gallery", url: "/data/gallery", icon: Image },
  { title: "Achievements", url: "/data/achievements", icon: Trophy },
  { title: "Awards", url: "/data/awards", icon: Award },
];

function SidebarContent({ onLinkClick, handleLogout }) {
  return (
    <>
      {/* Logo + Title */}
      <div className="px-6 py-5 flex items-center gap-3">
        <img src="/logo.png" alt="Federal Youth Parliament logo" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h1 className="text-base font-bold leading-tight">Admin Panel</h1>
          <p className="text-xs text-slate-400 leading-tight">Federal Youth Parliament</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col overflow-auto mt-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={link.url}
              end={link.url === "/"}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-white border-l-4 border-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{link.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: Logout + Copyright */}
      <div className="border-t border-slate-700 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </button>
        <p className="text-xs text-slate-500 px-5 py-3">
          © {new Date().getFullYear()} Federal Youth Parliament
        </p>
      </div>
    </>
  );
}

function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/apis/logout", { withCredentials: true });
    queryClient.invalidateQueries(["currentUser"]);
    queryClient.setQueryData(["currentUser"], null);
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-50 flex-col min-h-screen">
        <SidebarContent handleLogout={handleLogout} />
      </aside>

      {/* Mobile top bar — visible only below md */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900 text-slate-50 flex items-center px-4 py-3 gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          className="p-1 rounded hover:bg-slate-700 transition-colors duration-200"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Federal Youth Parliament logo" className="w-7 h-7 rounded-full object-cover" />
          <span className="text-sm font-bold">Admin Panel</span>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <aside className="relative w-64 h-full bg-slate-900 text-slate-50 flex flex-col">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-4 right-4 p-1 rounded hover:bg-slate-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <SidebarContent
              onLinkClick={() => setDrawerOpen(false)}
              handleLogout={handleLogout}
            />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
