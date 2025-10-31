import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { title: "Dashboard", url: "/" },
    { title: "Members", url: "/data/members" },
    { title: "Exectives", url: "/data/exectives" },
    { title: "Programs", url: "/data/programs" },
    { title: "Events", url: "/data/events" },
    { title: "News & Updates", url: "/data/news" },
    { title: "Gallery", url: "/data/gallery" },
    { title: "Achievements", url: "/data/achievements" },
    { title: "Awards", url: "/data/awards" },
  ];

  return (
    <aside className="w-full md:w-64 flex flex-col shadow-lg max-h-screen ">
      <div className="px-6 py-5 ">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide">
          Admin Panel 
        </h1>
        <p className="text-xs sm:text-sm text-green-700 font-bold">Federal Youth Parliament</p>
      </div>

      <nav className="flex-1 flex flex-col    overflow-auto">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.url}
            className={({ isActive }) =>
              `px-4 sm:px-6 py-1 sm:py-3 text-sm sm:text-base font-medium rounded-r-2xl transition-all duration-200
          ${
            isActive
              ? "bg-green-900 text-white shadow-md"
              : " hover:bg-green-800 hover:text-white"
          }`
            }
            end
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-5 py-4 text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-green-700 font-bold">Federal Youth Parliament</span>
      </div>
    </aside>
  );
}

export default Sidebar;
