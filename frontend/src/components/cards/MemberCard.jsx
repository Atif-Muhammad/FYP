import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Pencil, Trash2, User } from "lucide-react";
import MemberModal from "../models/MemberModel";
import {toLocalTime} from "../../utils/toLocalTime"

function MemberCard({ member, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          {/* Left: Image + Name */}
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

            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {member.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                CNIC: {member.CNIC}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 ml-4 shrink-0">
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

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 pt-3 text-gray-700 break-words">
                <Info label="Father Name" value={member.father_name} />
                <Info label="Date of Birth" value={toLocalTime(member.DOB)} />
                <Info label="District" value={member.district} />
                <Info label="PK" value={member.pk} />
                <Info label="Phone" value={member.phone} />
                <Info label="Email" value={member.email} />
                <div className="sm:col-span-2">
                  <span className="font-medium">About:</span>{" "}
                  <span
                    className="block text-gray-600 mt-1 line-clamp-3 hover:line-clamp-none transition-all"
                    title={member.about}
                  >
                    {member.about || "—"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <MemberModal
          member={member}
          onClose={() => setShowModal(false)}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
}

// Small reusable info row
const Info = ({ label, value }) => (
  <div className="truncate">
    <span className="font-medium">{label}:</span>{" "}
    <span className="text-gray-600 truncate">{value || "—"}</span>
  </div>
);

export default MemberCard;
