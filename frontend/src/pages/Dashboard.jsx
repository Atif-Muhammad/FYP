import { Users, Calendar, Layers, NotepadText } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
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

  // Convert array of ISO dates to cumulative counts for chart
  const processChartData = (dates = []) => {
    const sorted = dates.map(d => new Date(d)).sort((a,b)=>a-b);
    const result = sorted.map((date, index) => ({
      date: date.toISOString().split("T")[0], // show only YYYY-MM-DD
      value: index + 1
    }));
    return result;
  };

  const cards = [
    {
      title: "Total Members",
      icon: <Users className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />,
      value: data?.data?.members?.count,
      chartData: processChartData(data?.data?.members?.createdAt),
      color: "#2563EB",
    },
    {
      title: "Total Programs",
      icon: <Layers className="text-green-600 w-6 h-6 sm:w-7 sm:h-7" />,
      value: data?.data?.programs?.count,
      chartData: processChartData(data?.data?.programs?.createdAt),
      color: "#16A34A",
    },
    {
      title: "Upcoming Events",
      icon: <Calendar className="text-orange-600 w-6 h-6 sm:w-7 sm:h-7" />,
      value: data?.data?.events?.count,
      chartData: processChartData(data?.data?.events?.createdAt),
      color: "#F97316",
    },
    {
      title: "News/Updates (Active)",
      icon: <NotepadText className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7" />,
      value: data?.data?.news?.count,
      chartData: processChartData(data?.data?.news?.createdAt),
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-12 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 truncate">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-1">
            Welcome back! Here's an overview of your organization's content.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">{card.icon}</div>
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value ?? 0}</p>
              </div>
            </div>

            {/* Mini Graph */}
            <div className="w-full h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={card.chartData}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke={card.color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
