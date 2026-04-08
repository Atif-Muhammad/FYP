import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// color: "blue" | "green" | "orange" | "purple"
// chartData: array of { date, value } objects
function StatsCard({ title, value, icon: Icon, color, chartData = [] }) {
  const colorMap = {
    blue:   { border: "border-blue-500",   iconBg: "bg-blue-100",   stroke: "#2563EB", iconColor: "text-blue-600"   },
    green:  { border: "border-green-500",  iconBg: "bg-green-100",  stroke: "#16A34A", iconColor: "text-green-600"  },
    orange: { border: "border-orange-500", iconBg: "bg-orange-100", stroke: "#F97316", iconColor: "text-orange-600" },
    purple: { border: "border-purple-500", iconBg: "bg-purple-100", stroke: "#8B5CF6", iconColor: "text-purple-600" },
  };

  const { border, iconBg, stroke, iconColor } = colorMap[color] ?? colorMap.blue;

  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 ${border} p-5 flex flex-col gap-3`}>
      <div className="flex items-center gap-4">
        <div className={`${iconBg} rounded-xl p-3`}>
          <Icon className={`${iconColor} w-6 h-6`} />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value ?? 0}</p>
        </div>
      </div>

      {/* Mini recharts LineChart */}
      <div className="w-full h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsCard;
