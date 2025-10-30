import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Calendar, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import EventModal from "../models/EventModal";

function EventCard({ event, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        layout
        onClick={onToggle}
        className="bg-white border border-blue-600/20 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 p-5 relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className="text-lg font-bold text-gray-900 truncate"
              title={event.title}
            >
              {event.title || "Untitled Event"}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-sm mt-1">
              <span
                className="flex items-center gap-1 truncate max-w-[45%]"
                title={event.eventDate}
              >
                <Calendar size={16} className="text-blue-600 shrink-0" />
                <span className="truncate">{event.eventDate || "N/A"}</span>
              </span>
              <span
                className="flex items-center gap-1 truncate max-w-[45%]"
                title={event.location}
              >
                <MapPin size={16} className="text-blue-600 shrink-0" />
                <span className="truncate">{event.location || "Unknown"}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="p-2 rounded-full hover:bg-blue-100 transition"
            >
              <Pencil size={18} className="text-blue-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event);
              }}
              className="p-2 rounded-full hover:bg-red-100 transition"
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

        {/* Description */}
        <AnimatePresence>
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-700 leading-relaxed break-words whitespace-pre-wrap overflow-y-auto max-h-[20vh]"
            >
              {event.description?.trim() || "No description provided."}
            </motion.div>
          ) : (
            event.description && (
              <p
                className="mt-3 text-gray-700 text-sm line-clamp-2 overflow-hidden text-ellipsis whitespace-normal"
                title={event.description}
              >
                {event.description}
              </p>
            )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Edit Modal */}
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
