import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import GalleryModal from "../models/GalleryModal";

function GalleryCard({ media, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        className="rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: "var(--color-bg-surface)",
          border: hovered ? "1.5px solid var(--color-accent)" : "1px solid var(--color-border)",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image — 4:3 aspect ratio */}
        <div
          className="relative cursor-pointer overflow-hidden"
          style={{ aspectRatio: "4/3" }}
          onClick={onToggle}
        >
          <img
            src={media.image?.url}
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />

          {/* Dark green gradient overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to bottom, transparent 30%, var(--color-bg-dark) 100%)",
              opacity: hovered ? 0.7 : 0.3,
            }}
          />

          {/* Title on hover */}
          {hovered && (
            <span
              className="absolute bottom-3 left-4 right-20 text-white font-bold text-sm leading-tight truncate"
            >
              {media.title || "Untitled"}
            </span>
          )}

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              aria-label={`Edit ${media.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.92)", color: "var(--color-fyp-green)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent-dark)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-fyp-green)"}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(media); }}
              aria-label={`Delete ${media.title}`}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.92)", color: "var(--color-danger)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="rounded-full p-2 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.92)", color: "var(--color-text-secondary)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Card footer */}
        <div className="px-4 py-3">
          <h3
            className="font-bold text-sm truncate"
            style={{ color: "var(--color-text-primary)" }}
            title={media.title}
          >
            {media.title || "Untitled"}
          </h3>
        </div>

        {/* Expanded Description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
              style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-base)" }}
            >
              <p
                className="text-sm leading-relaxed break-words whitespace-pre-wrap pt-3 max-h-48 overflow-y-auto"
                style={{ color: "var(--color-text-secondary)", wordBreak: "break-word" }}
              >
                {media.description?.trim() || "No description provided."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showModal && (
        <GalleryModal
          photo={media}
          onClose={() => setShowModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

export default GalleryCard;
