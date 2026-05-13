import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Pencil, Trash2, User } from "lucide-react";
import MemberModal from "../models/MemberModel";
import { toLocalTime } from "../../utils/toLocalTime";

function MemberCard({ member, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="rounded-xl overflow-hidden transition-all duration-200 group"
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)";
          e.currentTarget.style.borderLeft = "3px solid var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
          e.currentTarget.style.borderLeft = "1px solid var(--color-border)";
        }}
      >
        <div className="flex items-center justify-between p-4">
          {/* Left: Avatar + Name */}
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <div
              className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shrink-0"
              style={{ background: "rgba(1,68,33,0.08)" }}
            >
              {member.image?.url ? (
                <img
                  src={member.image.url}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-5 h-5" style={{ color: "var(--color-fyp-green)" }} />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: "var(--color-text-primary)" }}>
                {member.name}
              </p>
              <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                CNIC: {member.CNIC}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 ml-3 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              aria-label={`Edit ${member.name}`}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-fyp-green)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(1,68,33,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(member)}
              aria-label={`Delete ${member.name}`}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-danger)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-danger-light)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full p-2 transition-colors duration-150"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
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
              transition={{ duration: 0.25 }}
              className="px-4 pb-4"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 pt-3 text-sm break-words">
                <Info label="Father Name" value={member.father_name} />
                <Info label="Date of Birth" value={toLocalTime(member.DOB)} />
                <Info label="District" value={member.district} />
                <Info label="PK" value={member.pk} />
                <Info label="Phone" value={member.phone} />
                <Info label="Email" value={member.email} />
                <div className="sm:col-span-2">
                  <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>About: </span>
                  <span
                    className="block mt-0.5 line-clamp-3 hover:line-clamp-none transition-all"
                    style={{ color: "var(--color-text-secondary)" }}
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

const Info = ({ label, value }) => (
  <div className="truncate text-sm">
    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>{label}: </span>
    <span style={{ color: "var(--color-text-secondary)" }}>{value || "—"}</span>
  </div>
);

export default MemberCard;
