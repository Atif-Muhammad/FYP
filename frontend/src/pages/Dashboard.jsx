import {
  Users, Calendar, Layers, NotepadText,
  UserCheck, Newspaper, Image, Trophy, Award, ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../config/apis";
import StatsCard from "../components/cards/StatsCard";

const ALL_SECTIONS = [
  {
    title: "Members",
    url: "/data/members",
    icon: Users,
    description: "View and manage all registered parliament members",
    dataKey: "members",
  },
  {
    title: "Executives",
    url: "/data/exectives",
    icon: UserCheck,
    description: "Manage the executive leadership team",
    dataKey: null,
  },
  {
    title: "Programs",
    url: "/data/programs",
    icon: Layers,
    description: "Oversee FYP programs and ongoing initiatives",
    dataKey: "programs",
  },
  {
    title: "Events",
    url: "/data/events",
    icon: Calendar,
    description: "Track upcoming and past parliament events",
    dataKey: "events",
  },
  {
    title: "News & Updates",
    url: "/data/news",
    icon: Newspaper,
    description: "Publish news articles and announcements",
    dataKey: "news",
  },
  {
    title: "Gallery",
    url: "/data/gallery",
    icon: Image,
    description: "Manage the FYP photo and media gallery",
    dataKey: null,
  },
  {
    title: "Achievements",
    url: "/data/achievements",
    icon: Trophy,
    description: "Showcase FYP milestones and achievements",
    dataKey: null,
  },
  {
    title: "Awards",
    url: "/data/awards",
    icon: Award,
    description: "Manage awards and recognitions received",
    dataKey: null,
  },
];

function SectionCard({ section, count, onClick }) {
  const Icon = section.icon;
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-xl p-5 transition-all duration-200"
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-fyp-green-light)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(1,68,33,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
      }}
    >
      {/* Icon + count badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(1,68,33,0.08)" }}
        >
          <Icon size={18} style={{ color: "var(--color-fyp-green)" }} />
        </div>
        {count != null && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.13)", color: "var(--color-accent-dark)" }}
          >
            {count}
          </span>
        )}
      </div>

      <p className="text-sm font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
        {section.title}
      </p>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
        {section.description}
      </p>

      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-fyp-green)" }}>
        Manage <ChevronRight size={12} />
      </div>
    </button>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboard,
  });

  const processChartData = (dates = []) => {
    const sorted = [...dates].map(d => new Date(d)).sort((a, b) => a - b);
    return sorted.map((date, i) => ({
      date: date.toISOString().split("T")[0],
      value: i + 1,
    }));
  };

  const statCards = [
    {
      title: "Total Members",
      icon: Users,
      value: data?.data?.members?.count,
      chartData: processChartData(data?.data?.members?.createdAt),
      url: "/data/members",
    },
    {
      title: "Total Programs",
      icon: Layers,
      value: data?.data?.programs?.count,
      chartData: processChartData(data?.data?.programs?.createdAt),
      url: "/data/programs",
    },
    {
      title: "Upcoming Events",
      icon: Calendar,
      value: data?.data?.events?.count,
      chartData: processChartData(data?.data?.events?.createdAt),
      url: "/data/events",
    },
    {
      title: "Active News",
      icon: NotepadText,
      value: data?.data?.news?.count,
      chartData: processChartData(data?.data?.news?.createdAt),
      url: "/data/news",
    },
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">

      {/* ── Welcome Banner ── */}
      <div
        className="rounded-2xl px-8 py-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-bg-dark) 0%, #014d27 100%)",
        }}
      >
        {/* Decorative gold rings */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
             style={{ border: "1px solid rgba(212,175,55,0.14)" }} />
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
             style={{ border: "1px solid rgba(212,175,55,0.09)" }} />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full pointer-events-none"
             style={{ border: "1px solid rgba(212,175,55,0.07)" }} />

        {/* Top row: heading + date */}
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-accent)" }}>
              Federal Youth Parliament
            </p>
            <h2
              className="text-3xl font-bold text-white leading-tight mb-1"
              style={{ letterSpacing: "-0.025em" }}
            >
              Welcome back, Admin
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Here's what's happening across FYP today.
            </p>
            <div className="mt-4 h-px w-16 rounded-full" style={{ background: "var(--color-accent)" }} />
          </div>

          {/* Date badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Calendar size={13} style={{ color: "var(--color-accent)" }} />
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
              {today}
            </span>
          </div>
        </div>

        {/* Quick-stat pills */}
        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {[
            { label: "Members",  dataKey: "members",  url: "/data/members" },
            { label: "Programs", dataKey: "programs", url: "/data/programs" },
            { label: "Events",   dataKey: "events",   url: "/data/events" },
            { label: "News",     dataKey: "news",     url: "/data/news" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.url)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.11)",
                color: "rgba(255,255,255,0.75)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.18)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <span className="font-bold" style={{ color: "var(--color-accent)" }}>
                {isLoading ? "…" : (data?.data?.[item.dataKey]?.count ?? "—")}
              </span>
              {item.label}
              <ChevronRight size={11} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)" }}>
          Overview
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl h-44"
                  style={{ background: "var(--color-bg-surface)", borderTop: "3px solid var(--color-border)" }}
                />
              ))
            : statCards.map((card) => (
                <StatsCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  chartData={card.chartData}
                  onClick={() => navigate(card.url)}
                />
              ))}
        </div>
      </div>

      {/* ── Content Management ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            Content Management
          </p>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {ALL_SECTIONS.length} sections
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_SECTIONS.map((section) => (
            <SectionCard
              key={section.url}
              section={section}
              count={section.dataKey ? data?.data?.[section.dataKey]?.count : undefined}
              onClick={() => navigate(section.url)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
