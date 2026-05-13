import { useState, useEffect, useRef } from "react";
import { X, Loader2, ImagePlus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function NewsModal({ update, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", description: "", validity: "", image: null });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validityOptions = ["24hours", "2days", "3days", "4days", "1week", "Until I Change"];

  useEffect(() => {
    if (update) {
      setFormData({ title: update.title || "", description: update.description || "", validity: update.validity || "", image: update.image || null });
      if (update.image?.url) setPreview(update.image.url);
      else setPreview("");
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) { toast.error("Image size must be less than 5MB"); return; }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) { toast.error("Image size must be less than 5MB"); return; }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => { setFormData({ ...formData, image: null }); setPreview(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("validity", formData.validity);
    if (update) data.append("_id", update._id);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else if (formData.image && typeof formData.image === "object") {
      data.append("image", JSON.stringify(formData.image));
    }
    await onSubmit(data);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 py-8"
      style={{ background: "rgba(1,36,18,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
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
          {update ? "Edit Update" : "Add Update"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Update title" className="fyp-input" required />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Update description" rows="4" className="fyp-input resize-none" style={{ paddingTop: "0.625rem" }} required />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Validity Duration</label>
            <select name="validity" value={formData.validity} onChange={handleChange} className="fyp-input appearance-none" required>
              <option value="" disabled>Select validity duration</option>
              {validityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Image upload */}
          <div
            onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
            className="relative flex flex-col items-center justify-center w-full rounded-xl p-6 cursor-pointer transition-colors duration-150"
            style={{ border: dragActive ? "2px dashed var(--color-fyp-green)" : "2px dashed var(--color-border)", background: dragActive ? "rgba(1,68,33,0.04)" : "transparent" }}
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-36 h-36 object-cover rounded-lg" style={{ border: "1px solid var(--color-border)" }} />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                  className="absolute top-1 right-1 rounded-full p-1 transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-danger)" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImagePlus size={32} style={{ color: "var(--color-fyp-green)" }} />
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Drag & drop or click to upload</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center transition-colors duration-150"
            style={{ background: loading ? "var(--color-text-muted)" : "var(--color-fyp-green)", cursor: loading ? "not-allowed" : "pointer" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green-light)"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--color-fyp-green)"; }}
          >
            {loading && <Loader2 className="animate-spin mr-2" size={16} />}
            {loading ? "Submitting…" : update ? "Update Record" : "Create Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsModal;
