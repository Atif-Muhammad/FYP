import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, FileText, X, Loader2 } from "lucide-react";

function EventModal({ event, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", description: "", eventDate: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        eventDate: event.eventDate || "",
        location: event.location || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("eventDate", formData.eventDate);
    data.append("location", formData.location);
    if (event) data.append("_id", event._id);
    await onSubmit(data);
    setLoading(false);
    onClose();
  };

  const inputClass = "fyp-input pl-9";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(1,36,18,0.6)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-3xl rounded-2xl p-8 relative overflow-y-auto max-h-[90vh]"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 transition-colors duration-150"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
          {event ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Title</label>
            <div className="relative">
              <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
              <input name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Event title" required />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Date</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Location</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }} />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Venue / Address" className={inputClass} required />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              rows="6" placeholder="Event details, purpose, etc."
              className="fyp-input resize-none" style={{ paddingTop: "0.625rem" }}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button" onClick={onClose}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{ border: "1.5px solid var(--color-border)", color: "var(--color-text-secondary)", background: "transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white flex items-center justify-center min-w-[130px] transition-colors duration-150"
              style={{ background: loading ? "var(--color-text-muted)" : "var(--color-fyp-green)", cursor: loading ? "not-allowed" : "pointer" }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green-light)"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green)"; }}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EventModal;
