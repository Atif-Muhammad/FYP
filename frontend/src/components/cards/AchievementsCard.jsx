import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Pencil, Trash2, Trophy } from "lucide-react";
import AchievementModal from "../models/AchievementsModal";

function AchievementCard({ achievement, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="rounded-xl overflow-hidden transition-all duration-200"
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)";
          e.currentTarget.style.borderLeft = "3px solid var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderLeft = "1px solid var(--color-border)";
        }}
      >
        <div className="flex items-center justify-between p-4">
          {/* Left: thumbnail + info */}
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <div
              className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              {achievement?.image?.url ? (
                <img
                  src={achievement.image.url}
                  alt={achievement.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Trophy className="w-5 h-5" style={{ color: "var(--color-accent-dark)" }} />
              )}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: "var(--color-text-primary)" }}>
                {achievement?.title || "Untitled"}
              </p>
              {achievement?.description && (
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-muted)" }}>
                  {achievement.description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-3 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              aria-label={`Edit ${achievement?.title}`}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-fyp-green)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(1,68,33,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(achievement)}
              aria-label={`Delete ${achievement?.title}`}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-danger)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-danger-light)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Expand */}
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
                className="text-sm leading-relaxed break-words pt-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {achievement?.description || "No description available."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <AchievementModal
          achievement={achievement}
          onClose={() => setShowModal(false)}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
}

export default AchievementCard;
