function Confirmation({ show, message, onConfirm, onCancel, loading }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(1,36,18,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      />

      <div
        className="relative z-10 p-6 w-80 max-w-full rounded-2xl"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "var(--color-danger-light)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-danger)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <p
          className="text-sm text-center mb-6 leading-relaxed"
          style={{ color: "var(--color-text-primary)" }}
        >
          {message || "Are you sure?"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
            style={{
              border: "1.5px solid var(--color-border)",
              color: "var(--color-text-secondary)",
              background: "transparent",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors duration-150"
            style={{ background: "var(--color-danger)" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#B91C1C"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--color-danger)"}
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
