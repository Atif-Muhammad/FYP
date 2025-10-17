
function StatsCard({ card }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-gray-700 font-semibold">{card.title}</div>
        {card.icon}
      </div>
      <div className="text-3xl font-extrabold text-gray-900">
        {card.value ?? "--"}
      </div>
    </div>
  );
}

export default StatsCard;
