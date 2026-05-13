import { ChevronRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

function StatsCard({ title, value, icon: Icon, chartData = [], onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-200"
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border)",
        borderTop: "3px solid var(--color-accent)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        cursor: onClick ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (!onClick) return;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
      }}
    >
      {/* Icon + Value row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-2 min-w-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(1,68,33,0.08)" }}
          >
            <Icon size={18} style={{ color: "var(--color-fyp-green)" }} />
          </div>
          <p className="text-xs font-medium truncate" style={{ color: "var(--color-text-muted)" }}>
            {title}
          </p>
          <p
            className="font-bold leading-none"
            style={{ fontSize: "2rem", color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}
          >
            {value ?? "—"}
          </p>
        </div>
        {onClick && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "rgba(212,175,55,0.12)" }}
          >
            <ChevronRight size={13} style={{ color: "var(--color-accent-dark)" }} />
          </div>
        )}
      </div>

      {/* Sparkline */}
      <div className="w-full h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Tooltip
              contentStyle={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "11px",
                padding: "4px 8px",
              }}
              itemStyle={{ color: "var(--color-text-primary)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: "var(--color-accent)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer link */}
      {onClick && (
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-fyp-green)" }}>
          View all <ChevronRight size={11} />
        </div>
      )}
    </div>
  );
}

export default StatsCard;
