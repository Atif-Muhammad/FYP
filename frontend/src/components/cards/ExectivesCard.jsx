import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Pencil, Trash2, User } from "lucide-react";
import ExectivesModal from "../models/ExectivesModal";

function ExectivesCard({ member, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const truncate = (text, limit = 50) =>
    text && text.length > limit ? text.slice(0, limit) + "..." : text || <strong>N/A</strong>;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              {member.image?.url ? (
                <img
                  src={member.image.url}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-6 h-6 text-blue-700" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 truncate">
                {member.name} ({member.role})
              </p>
              <p className="text-sm text-gray-500 truncate">
                About: {truncate(member.about, 40)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Pencil className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(member)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 pt-3 text-gray-700 text-sm break-words">
                <div>
                  <span className="font-medium">From:</span> {truncate(member.district, 30)}
                </div>
                <div>
                  <span className="font-medium">Living in:</span> {truncate(member.livingIn, 30)}
                </div>

                <div className="col-span-2">
                  <span className="font-medium">Socials:</span>
                  <div className="ml-2">
                    <div>fb: {truncate(member.socials?.fb, 40)}</div>
                    <div>insta: {truncate(member.socials?.insta, 40)}</div>
                    <div>twitter: {truncate(member.socials?.twitter, 40)}</div>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="font-medium">Message:</span> {truncate(member.message, 100)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <ExectivesModal
          member={member}
          onClose={() => setShowModal(false)}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
}

export default ExectivesCard;
