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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
            <div className="flex items-center gap-3 text-gray-600 text-sm mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={16} className="text-blue-600" />
                {event.eventDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-blue-600" />
                {event.location}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
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

        {/* Expanded Details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-700 leading-relaxed"
            >
              {event.description || "No description provided."}
            </motion.div>
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
