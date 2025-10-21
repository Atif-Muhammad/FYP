import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
