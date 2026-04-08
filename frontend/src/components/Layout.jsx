import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/data/members": "Members",
  "/data/exectives": "Executives",
  "/data/programs": "Programs",
  "/data/events": "Events",
  "/data/news": "News & Updates",
  "/data/gallery": "Gallery",
  "/data/achievements": "Achievements",
  "/data/awards": "Awards",
};

function Layout() {
  const { pathname } = useLocation();
  const pageTitle = PAGE_TITLES[pathname] ?? "Admin Panel";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="bg-slate-100 flex-1 overflow-auto pt-16 md:pt-0">
        {/* Desktop-only top header bar */}
        <header className="hidden md:block bg-white border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">{pageTitle}</h2>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
