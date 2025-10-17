import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { title: "Dashboard", url: "/" },
    { title: "Members", url: "/data/members" },
    { title: "Programs", url: "/data/programs" },
    { title: "Events", url: "/data/events" },
    { title: "News & Updates", url: "/data/news" },
    { title: "Gallery", url: "/data/gallery" },
  ];

  return (
    <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col shadow-lg min-h-screen">
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide">
          Admin Panel
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">Manage Content</p>
      </div>

      <nav className="flex-1 flex flex-col py-4 space-y-1 overflow-auto">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.url}
            className={({ isActive }) =>
              `px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-r-full transition-all duration-200
          ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`
            }
            end
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-6 py-4 border-t border-gray-700 text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} FYP-Admin
      </div>
    </aside>
  );
}

export default Sidebar;
