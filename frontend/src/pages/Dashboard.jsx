import { Users, Calendar, Layers, NotepadText } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboard } from "../../config/apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/cards/StatsCard";

function Dashboard() {
  const { data, isLoading } = useQuery({
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

  // Convert array of ISO dates to cumulative counts for chart
  const processChartData = (dates = []) => {
    const sorted = dates.map(d => new Date(d)).sort((a, b) => a - b);
    return sorted.map((date, index) => ({
      date: date.toISOString().split("T")[0],
      value: index + 1,
    }));
  };

  const cards = [
    {
      title: "Total Members",
      icon: Users,
      value: data?.data?.members?.count,
      chartData: processChartData(data?.data?.members?.createdAt),
      color: "blue",
    },
    {
      title: "Total Programs",
      icon: Layers,
      value: data?.data?.programs?.count,
      chartData: processChartData(data?.data?.programs?.createdAt),
      color: "green",
    },
    {
      title: "Upcoming Events",
      icon: Calendar,
      value: data?.data?.events?.count,
      chartData: processChartData(data?.data?.events?.createdAt),
      color: "orange",
    },
    {
      title: "News/Updates (Active)",
      icon: NotepadText,
      value: data?.data?.news?.count,
      chartData: processChartData(data?.data?.news?.createdAt),
      color: "purple",
    },
  ];

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-12 py-6 border rounded-2xl border-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 truncate">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-1">
            Welcome back! Here's an overview of Federal Youth Parliament's content.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl h-40 shadow-md"
              />
            ))
          : cards.map((card, index) => (
              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                chartData={card.chartData}
              />
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
