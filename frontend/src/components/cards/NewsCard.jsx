import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Clock, ChevronDown, CalendarDays } from "lucide-react";
import NewsModal from "../models/NewsModal";
import { toLocalTime } from "../../utils/toLocalTime";

function NewsCard({ news, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        onClick={onToggle}
        className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          background: "var(--color-bg-surface)",
          border: hovered ? "1.5px solid var(--color-accent)" : "1px solid var(--color-border)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={news.image?.url}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />
          {/* Dark green gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, var(--color-bg-dark) 100%)",
              opacity: 0.75,
            }}
          />

          {/* Title on overlay */}
          <h3
            className="absolute bottom-3 left-4 right-20 text-white font-bold text-base leading-tight drop-shadow-lg"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            title={news.title}
          >
            {news.title}
          </h3>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              aria-label={`Edit ${news.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-fyp-green)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "white"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(news); }}
              aria-label={`Delete ${news.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-danger)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "white"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-text-secondary)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="px-4 py-3 flex items-center gap-4 flex-wrap">
          <span
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "rgba(1,68,33,0.08)", color: "var(--color-fyp-green)" }}
          >
            <CalendarDays size={11} />
            {toLocalTime(news.createdAt)}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "rgba(212,175,55,0.12)", color: "var(--color-accent-dark)" }}
          >
            <Clock size={11} />
            {news.validity ? toLocalTime(news.validity) : news.validityType}
          </span>
        </div>

        {/* Expandable description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <p
                className="text-sm leading-relaxed break-words whitespace-pre-wrap pt-3"
                style={{ color: "var(--color-text-secondary)", wordBreak: "break-word" }}
              >
                {news.description || "No description available."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showModal && (
        <NewsModal
          update={news}
          onClose={() => setShowModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

export default NewsCard;
