import { Users, Calendar, Layers, NotepadText } from "lucide-react";
import StatsCard from "../components/cards/StatsCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboard } from "../../config/apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboard,
    enabled: true,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/apis/logout", { withCredentials: true });

    queryClient.invalidateQueries(["currentUser"]);
    queryClient.setQueryData(["currentUser"], null);

    navigate("/", { replace: true });
  };




  const cards = [
    { title: "Total Members", icon: <Users className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />, value: data?.data?.members },
    { title: "Total Programs", icon: <Layers className="text-green-600 w-6 h-6 sm:w-7 sm:h-7" />, value: data?.data?.programs },
    { title: "Upcoming Events", icon: <Calendar className="text-orange-600 w-6 h-6 sm:w-7 sm:h-7" />, value: data?.data?.events },
    { title: "News/Updates (Active)", icon: <NotepadText className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7" />, value: data?.data?.news },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 truncate">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            Welcome back! Here's an overview of your organization's content.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <StatsCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
