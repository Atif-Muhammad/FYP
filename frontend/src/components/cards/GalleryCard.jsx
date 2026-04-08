import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import GalleryModal from "../models/GalleryModal";

function GalleryCard({ media, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {/* Image Wrapper */}
        <div
          className="relative cursor-pointer w-full h-64 overflow-hidden rounded-t-2xl"
          onClick={onToggle}
        >
          <img
            src={media.image?.url}
            alt={media.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-2 right-2 flex gap-2 p-1 rounded-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              aria-label={`Edit ${media.title}`}
              className="text-blue-600 hover:bg-blue-50 rounded-full p-2 transition bg-white/80"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(media);
              }}
              aria-label={`Delete ${media.title}`}
              className="text-red-600 hover:bg-red-50 rounded-full p-2 transition bg-white/80"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="rounded-full p-2 bg-white/80 hover:bg-white shadow transition"
            >
              <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Card Header */}
        <div className="p-4">
          <h3
            className="text-xl font-bold text-gray-900 truncate"
            title={media.title}
          >
            {media.title || "Untitled"}
          </h3>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border-t border-purple-200/40 px-6 py-4"
            >
              <p
                className="text-gray-700 text-sm break-words whitespace-pre-wrap leading-relaxed overflow-hidden"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxHeight: "12rem",
                  textOverflow: "ellipsis",
                }}
              >
                {media.description?.trim()
                  ? media.description
                  : "No description provided."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Edit Modal */}
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
