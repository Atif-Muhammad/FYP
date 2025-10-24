import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Pencil, Trash2, User } from "lucide-react";
import MemberModal from "../models/MemberModel";
import { BufferToBase64 } from "../../utils/bufferToBase64";


function MemberCard({ member, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4">
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-4 cursor-pointer flex-1"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full overflow-hidden object-fit">
              {member.image.url ? <img src={member.image.url} alt={member.name} />
                : <User className="w-6 h-6 text-blue-700" />}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{member.name} ({member.role})</p>
              <p className="text-sm text-gray-500">CNIC: {member.CNIC}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 pt-3 text-gray-700">
                <div><span className="font-medium">Father Name:</span> {member.father_name}</div>
                <div><span className="font-medium">Date of Birth:</span> {member.DOB}</div>
                <div><span className="font-medium">District:</span> {member.district}</div>
                <div><span className="font-medium">PK:</span> {member.pk}</div>
                <div><span className="font-medium">Phone:</span> {member.phone}</div>
                <div><span className="font-medium">Email:</span> {member.email}</div>
                <div><span className="font-medium">About:</span> <span className="whitespace-normal break-words w-[50vh] ">{member.about}</span></div>
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

export default MemberCard;
