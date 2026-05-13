import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, User, FileText, X, AlertCircle } from "lucide-react";

function AchievementModal({ achievement, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", description: "", image: null });
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (achievement) {
      setFormData({ title: achievement.title || "", description: achievement.description || "", image: achievement.image || null });
      setPreview(achievement.image?.url || "");
    }
  }, [achievement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image size must be less than 5MB"); return; }
    setError("");
    setFormData((p) => ({ ...p, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData();
    for (const key in formData) {
      if (key === "image" && formData.image instanceof File) data.append("image", formData.image);
      else if (key === "image" && typeof formData.image === "object" && formData.image !== null) data.append("image", JSON.stringify(formData.image));
      else data.append(key, formData[key]);
    }
    if (achievement?._id) data.append("_id", achievement._id);
    try {
      await onSubmit(data);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(1,36,18,0.6)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--color-bg-surface)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
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

        <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
          {achievement ? "Edit Achievement" : "Add Achievement"}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: "var(--color-danger-light)", border: "1px solid var(--color-danger)", color: "var(--color-danger)" }}>
            <AlertCircle size={16} /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Title</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><User size={14} /></span>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="fyp-input pl-9" placeholder="Achievement title" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Description</label>
            <div className="relative">
              <span className="absolute left-3 top-3 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><FileText size={14} /></span>
              <textarea name="description" value={formData.description} onChange={handleChange} className="fyp-input pl-9 resize-none min-h-[80px]" style={{ paddingTop: "0.625rem" }} placeholder="Describe the achievement" />
            </div>
          </div>

          {/* Image Upload */}
          <div
            className="flex flex-col items-center rounded-xl p-5 cursor-pointer transition-colors duration-150"
            style={{ border: isDragging ? "2px dashed var(--color-fyp-green)" : "2px dashed var(--color-border)", background: isDragging ? "rgba(1,68,33,0.04)" : "transparent" }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageChange(e.dataTransfer.files[0]); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <label className="text-xs font-medium mb-3 flex items-center gap-2 cursor-pointer" style={{ color: "var(--color-text-secondary)" }}>
              <ImageIcon size={14} /> Upload Image
            </label>
            <div className="w-28 h-28 rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
                  <ImageIcon size={32} style={{ color: "var(--color-text-muted)" }} />
                </div>
              )}
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>Drag & drop or click to upload</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleImageChange(e.target.files[0])} className="hidden" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button" onClick={onClose} disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{ border: "1.5px solid var(--color-border)", color: "var(--color-text-secondary)", background: "transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors duration-150"
              style={{ background: loading ? "var(--color-text-muted)" : "var(--color-fyp-green)", cursor: loading ? "not-allowed" : "pointer" }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green-light)"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green)"; }}
            >
              {loading ? (achievement ? "Updating…" : "Creating…") : (achievement ? "Update" : "Create")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AchievementModal;
