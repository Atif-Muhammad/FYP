import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Pencil, Trash2, ImageIcon } from "lucide-react";
import ProgramModal from "../models/ProgramModal";

function ProgramCard({ program, expanded, onToggle, onUpdate, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:max-w-xl mx-auto">
        
        <div
          className="relative w-full h-48 sm:h-56 cursor-pointer overflow-hidden rounded-t-2xl flex items-center justify-center bg-blue-50"
          onClick={onToggle}
        >
          {program.image ? (
            <img
              src={program.image.url}
              alt={program.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-blue-700" />
          )}

          {/* Admin Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow"
            >
              <Pencil size={16} className="text-blue-600" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(program); }}
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

        {/* Program Info */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
            {program.title}
          </h3>
        </div>

        {/* Expanded Description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 sm:px-5 pb-4 border-t border-gray-200 bg-gray-50"
            >
              <p className="text-gray-700 text-sm sm:text-base break-words whitespace-normal">
                {program.description || "No description available."}
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
