import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Calendar, MapPin, ChevronDown } from "lucide-react";
import EventModal from "../models/EventModal";

function EventCard({ event, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const isUpcoming = event.eventDate
    ? new Date(event.eventDate) >= new Date()
    : false;

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        onClick={onToggle}
        className="rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden"
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          borderLeft: isUpcoming
            ? "3px solid var(--color-accent)"
            : "3px solid var(--color-border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
        onHoverStart={(e) => {
          e.target.closest?.("[data-layout]");
        }}
      >
        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Status badge */}
              <span
                className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={isUpcoming
                  ? { background: "rgba(212,175,55,0.15)", color: "var(--color-accent-dark)" }
                  : { background: "var(--color-bg-base)", color: "var(--color-text-muted)" }
                }
              >
                {isUpcoming ? "Upcoming" : "Past"}
              </span>

              <h3
                className="text-base font-bold truncate"
                style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
                title={event.title}
              >
                {event.title || "Untitled Event"}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                <span className="flex items-center gap-1.5 text-xs">
                  <Calendar
                    size={13}
                    style={{ color: "var(--color-fyp-green)", flexShrink: 0 }}
                  />
                  <span
                    className="truncate max-w-[160px]"
                    style={{ color: "var(--color-text-secondary)" }}
                    title={event.eventDate}
                  >
                    {event.eventDate || "N/A"}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <MapPin
                    size={13}
                    style={{ color: "var(--color-fyp-green)", flexShrink: 0 }}
                  />
                  <span
                    className="truncate max-w-[160px]"
                    style={{ color: "var(--color-text-secondary)" }}
                    title={event.location}
                  >
                    {event.location || "Unknown"}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                aria-label={`Edit ${event.title}`}
                className="rounded-full p-2 transition-colors duration-150"
                style={{ color: "var(--color-fyp-green)" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(1,68,33,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(event); }}
                aria-label={`Delete ${event.title}`}
                className="rounded-full p-2 transition-colors duration-150"
                style={{ color: "var(--color-danger)" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-danger-light)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <Trash2 size={15} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="rounded-full p-2 transition-colors duration-150"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <ChevronDown size={15} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Description preview */}
          {!expanded && event.description && (
            <p
              className="mt-3 text-xs line-clamp-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {event.description}
            </p>
          )}
        </div>

        {/* Expanded Description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-5 pb-5"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <p
                className="text-sm leading-relaxed break-words whitespace-pre-wrap overflow-y-auto max-h-[20vh] pt-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {event.description?.trim() || "No description provided."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showModal && (
        <EventModal
          event={event}
          onClose={() => setShowModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

export default EventCard;
