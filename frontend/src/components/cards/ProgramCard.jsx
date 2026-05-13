import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Pencil, Trash2, ImageIcon } from "lucide-react";
import ProgramModal from "../models/ProgramModal";

function ProgramCard({ program, expanded, onToggle, onUpdate, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: "var(--color-bg-surface)",
          border: hovered ? "1.5px solid var(--color-accent)" : "1px solid var(--color-border)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative w-full h-52 cursor-pointer overflow-hidden flex items-center justify-center"
          style={{ background: "rgba(1,68,33,0.06)" }}
          onClick={onToggle}
        >
          {program.image?.url ? (
            <>
              <img
                src={program.image.url}
                alt={program.title || "Program"}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
              />
              {/* Dark green overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 40%, var(--color-bg-dark) 100%)",
                  opacity: 0.7,
                }}
              />
              {/* Title on overlay */}
              <h3
                className="absolute bottom-3 left-4 right-16 text-white font-bold text-base truncate drop-shadow-lg"
              >
                {program.title?.length ? program.title : "Untitled Program"}
              </h3>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-10 h-10" style={{ color: "var(--color-fyp-green)" }} />
              <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>No image</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              aria-label={`Edit ${program.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "var(--color-fyp-green)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "white"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(program); }}
              aria-label={`Delete ${program.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "var(--color-danger)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "white"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="rounded-full p-2 transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "var(--color-text-secondary)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Card footer (when no image title is shown) */}
        {!program.image?.url && (
          <div className="px-4 py-3" style={{ borderTop: "1px solid var(--color-border)" }}>
            <h3 className="font-bold text-sm truncate" style={{ color: "var(--color-text-primary)" }} title={program.title}>
              {program.title?.length ? program.title : "Untitled Program"}
            </h3>
          </div>
        )}

        {/* Expanded Description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 py-4"
              style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-base)" }}
            >
              <p
                className="text-sm leading-relaxed break-words"
                style={{
                  color: "var(--color-text-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {program.description?.trim() || "No description available."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <ProgramModal
          program={program}
          onClose={() => setShowModal(false)}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
}

export default ProgramCard;
