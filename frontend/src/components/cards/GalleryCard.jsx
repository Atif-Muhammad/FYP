import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Calendar, Image as ImageIcon, ChevronUp, ChevronDown } from "lucide-react";
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
        className="bg-white border border-purple-600/30 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        {/* Image Wrapper */}
        <div
          className="relative cursor-pointer w-full h-64 overflow-hidden rounded-t-2xl"
          onClick={onToggle}
        >
          <img
            src={
              media.image?.base64
                ? `data:${media.image.mimetype};base64,${media.image.base64}` : ""
            }
            alt={media.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-2 right-2 flex gap-2 p-1 rounded-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              <Pencil size={18} className="text-green-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(media);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
           >
              <Trash2 size={18} className="text-red-600" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Card Header */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900">{media.title}</h3>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border-t border-purple-200/40 px-6 py-4 space-y-3"
            >
              <p className="text-gray-700 text-sm break-words whitespace-normal leading-relaxed">
                {media.description || "No description provided."}
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
