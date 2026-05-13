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

const PAGE_SUBTITLES = {
  "/": "Overview of Federal Youth Parliament's content",
  "/data/members": "Manage registered parliament members",
  "/data/exectives": "Manage executive leadership team",
  "/data/programs": "Manage FYP programs and initiatives",
  "/data/events": "Manage upcoming and past events",
  "/data/news": "Manage news articles and updates",
  "/data/gallery": "Manage photo gallery",
  "/data/achievements": "Manage FYP achievements",
  "/data/awards": "Manage FYP awards",
};

function Layout() {
  const { pathname } = useLocation();
  const pageTitle = PAGE_TITLES[pathname] ?? "Admin Panel";
  const pageSubtitle = PAGE_SUBTITLES[pathname] ?? "";

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-bg-base)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Page Header */}
        <header
          className="hidden md:flex items-center justify-between px-8 py-4 shrink-0"
          style={{
            background: "var(--color-bg-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div>
            <h1
              className="text-2xl font-bold tracking-tight leading-tight"
              style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
            >
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {pageSubtitle}
              </p>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pt-14 md:pt-0">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
