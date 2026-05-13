import { useState } from "react";
import { NavLink } from "react-router-dom";
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
import { logout } from "../../config/apis";

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
    <div className="flex flex-col h-full">
      {/* Logo + Brand */}
      <div className="px-6 py-6 flex items-center gap-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <img
          src="/logo.png"
          alt="Federal Youth Parliament logo"
          className="w-10 h-10 rounded-full object-cover ring-2 shrink-0"
          style={{ ringColor: "var(--color-accent)" }}
        />
        <div>
          <h1 className="text-sm font-bold leading-tight text-white tracking-wide">
            Admin Panel
          </h1>
          <p className="text-xs leading-tight font-medium" style={{ color: "var(--color-accent)" }}>
            Federal Youth Parliament
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col overflow-y-auto py-3 gap-0.5 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.url}
              to={link.url}
              end={link.url === "/"}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`
              }
              style={({ isActive }) => isActive
                ? {
                    background: "var(--color-fyp-green-light)",
                    borderLeft: "3px solid var(--color-accent)",
                    paddingLeft: "13px",
                  }
                : {
                    borderLeft: "3px solid transparent",
                  }
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
              <span>{link.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className="px-3 py-4 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-lg transition-all duration-200"
          style={{ ":hover": { background: "var(--color-fyp-green)" } }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-fyp-green)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </button>
        <p className="text-xs px-4 pt-3 pb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Federal Youth Parliament
        </p>
      </div>
    </div>
  );
}

function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    // Fire-and-forget: don't await — the Render backend may be sleeping
    // and an awaited request would hang indefinitely with no timeout.
    logout().catch(() => {});
    // Flag tells App.jsx to skip userWho on the next load so the
    // dashboard can't re-appear while the cookie is still in flight.
    sessionStorage.setItem("fyp_logout", "1");
    window.location.replace("/");
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col min-h-screen shrink-0"
        style={{ width: "260px", background: "var(--color-bg-dark)", color: "white" }}
      >
        <SidebarContent handleLogout={handleLogout} />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center px-4 py-3 gap-3"
        style={{ background: "var(--color-bg-dark)", color: "white" }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          className="p-1.5 rounded-lg transition-colors duration-200"
          style={{ color: "white" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-fyp-green)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Federal Youth Parliament logo" className="w-7 h-7 rounded-full object-cover" />
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="relative flex flex-col h-full"
            style={{ width: "260px", background: "var(--color-bg-dark)", color: "white" }}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors duration-200"
              style={{ color: "white" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-fyp-green)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
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
