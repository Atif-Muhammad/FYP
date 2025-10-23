import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Calendar, User, Clock, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import NewsModal from "../models/NewsModal";

function NewsCard({ news, onUpdate, expanded, onToggle, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (formData) => {
    onUpdate && onUpdate(formData);
  };

  return (
    <>
      <motion.div
        layout
        onClick={onToggle}
        className="bg-white border border-green-600/30 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 w-full max-w-2xl mx-auto"
      >
        {/* 🖼️ Image Section */}
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={`data:${news.image.mimetype};base64,${news.image?.base64}`}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Headline overlay for dramatic effect */}
          <h3 className="absolute bottom-2 left-4 text-xl font-bold text-white drop-shadow-lg pr-10">
            {news.title}
          </h3>

          {/* Edit/Delete buttons floating on top-right */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              <Pencil size={16} className="text-green-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(news);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* 📰 Content Section */}
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{news.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{news.validity || "Not specified"}</span>
            </div>
            
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-green-200/50 pt-3"
              >
                <p className="text-gray-800 text-sm leading-relaxed break-words whitespace-normal">
                  {news.description || "No description available."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/Collapse Label
          <div className="text-right text-xs text-green-700 font-medium">
            {expanded ? "Show Less ▲" : "Read More ▼"}
          </div> */}
        </div>
      </motion.div>

      {/* 🧩 Modal */}
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
