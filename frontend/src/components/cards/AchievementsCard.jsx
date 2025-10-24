import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Pencil, Trash2, Award } from "lucide-react";
import AchievementModal from "../models/AchievementsModal";

function AchievementCard({ achievement, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // console.log(achievement)

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          {/* Left section */}
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-4 cursor-pointer flex-1"
          >
            <div className="bg-yellow-100 w-12 h-12 rounded-full overflow-hidden object-fit flex items-center justify-center">
              {achievement?.image?.url ? (
                <img
                  src={achievement.image?.url}
                  alt={achievement.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Award className="w-6 h-6 text-yellow-700" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {achievement?.title}
              </p>
              <p className="text-sm text-gray-500">
                {achievement?.description?.length > 50
                  ? achievement?.description.slice(0, 50) + "..."
                  : achievement?.description}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Pencil className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(achievement)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>

        {/* Expand Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 border-t border-gray-100"
            >
              <div className="pt-3 text-gray-700">
                <p>{achievement?.description}</p>
              </div>
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
