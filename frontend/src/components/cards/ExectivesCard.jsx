import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Pencil, Trash2, User } from "lucide-react";
import ExectivesModal from "../models/ExectivesModal";

const ROLE_BADGE = {
  Chairman: { bg: "rgba(212,175,55,0.15)", color: "var(--color-accent-dark)", border: "rgba(212,175,55,0.4)" },
  President: { bg: "rgba(212,175,55,0.15)", color: "var(--color-accent-dark)", border: "rgba(212,175,55,0.4)" },
  "Vice President": { bg: "rgba(1,68,33,0.1)", color: "var(--color-fyp-green)", border: "rgba(1,68,33,0.25)" },
  "General Secretary": { bg: "rgba(1,68,33,0.1)", color: "var(--color-fyp-green)", border: "rgba(1,68,33,0.25)" },
  "Patron in Chief": { bg: "rgba(212,175,55,0.15)", color: "var(--color-accent-dark)", border: "rgba(212,175,55,0.4)" },
};

function getRoleBadgeStyle(role) {
  return ROLE_BADGE[role] ?? {
    bg: "rgba(74,85,104,0.08)",
    color: "var(--color-text-secondary)",
    border: "var(--color-border)",
  };
}

function ExectivesCard({ member, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const truncate = (text, limit = 50) =>
    text && text.length > limit ? text.slice(0, limit) + "..." : text || "N/A";

  const badgeStyle = getRoleBadgeStyle(member.role);

  return (
    <>
      <div
        className="rounded-xl overflow-hidden transition-all duration-200"
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
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <div
              className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shrink-0"
              style={{ background: "rgba(1,68,33,0.08)" }}
            >
              {member.image?.url ? (
                <img src={member.image.url} alt={member.name} className="object-cover w-full h-full" />
              ) : (
                <User className="w-5 h-5" style={{ color: "var(--color-fyp-green)" }} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--color-text-primary)" }}>
                  {member.name}
                </p>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: badgeStyle.bg,
                    color: badgeStyle.color,
                    border: `1px solid ${badgeStyle.border}`,
                  }}
                >
                  {member.role}
                </span>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-muted)" }}>
                {truncate(member.about, 50)}
              </p>
            </div>
          </div>

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
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

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
                <div>
                  <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>From: </span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{truncate(member.district, 30)}</span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Living in: </span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{truncate(member.livingIn, 30)}</span>
                </div>
                {member.socials && (
                  <div className="col-span-2">
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Socials: </span>
                    <div className="ml-2 mt-1 space-y-0.5" style={{ color: "var(--color-text-secondary)" }}>
                      {member.socials.fb && <div>FB: {truncate(member.socials.fb, 40)}</div>}
                      {member.socials.insta && <div>Instagram: {truncate(member.socials.insta, 40)}</div>}
                      {member.socials.twitter && <div>Twitter: {truncate(member.socials.twitter, 40)}</div>}
                    </div>
                  </div>
                )}
                {member.message && (
                  <div className="col-span-2">
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Message: </span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{truncate(member.message, 100)}</span>
                  </div>
                )}
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
