import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  UserRoundPen,
  Pin,
  IdCard,
  Calendar,
  Phone,
  UserCircle2,
  AlertCircle,
  X,
} from "lucide-react";

function MemberModal({ member, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    CNIC: "",
    DOB: "",
    phone: "",
    pk: "",
    district: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        DOB: member.DOB ? new Date(member.DOB).toISOString().split("T")[0] : "",
        image: member.image,
      });
      setPreview(member?.image?.url || "");
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = value;
    if (name === "phone") updated = value.replace(/\D/g, "").slice(0, 11);
    if (name === "CNIC") updated = value.replace(/\D/g, "").slice(0, 13);
    setFormData((prev) => ({ ...prev, [name]: updated }));
  };

  const handleFileSelect = () => fileInputRef.current?.click();

  const handleImageChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }
    setError("");
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    try {
      const data = new FormData();
      const normalizedData = {
        ...formData,
        DOB: formData.DOB ? new Date(formData.DOB).toISOString() : "",
      };

      for (const key in normalizedData) {
        const val = normalizedData[key];
        if (key === "image") {
          if (val instanceof File) {
            data.append("image", val);
          } else if (val && typeof val === "object") {
            data.append("image", JSON.stringify(val));
          }
        } else {
          data.append(key, val);
        }
      }

      await onSubmit(data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text", icon: <User size={16} /> },
    { label: "Father Name", name: "father_name", type: "text", icon: <UserCircle2 size={16} /> },
    { label: "CNIC", name: "CNIC", type: "text", icon: <IdCard size={16} /> },
    { label: "Date of Birth", name: "DOB", type: "date", icon: <Calendar size={16} /> },
    { label: "District", name: "district", type: "text", icon: <Pin size={16} /> },
    { label: "PK", name: "pk", type: "text", icon: <span className="text-xs font-bold">PK</span> },
    { label: "Phone", name: "phone", type: "text", icon: <Phone size={16} /> },
    { label: "About", name: "about", type: "textArea", icon: <UserRoundPen size={16} /> },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{ background: "rgba(1,36,18,0.6)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 relative"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 transition-colors duration-150"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-base)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <X size={18} />
        </button>

        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
        >
          {member ? "Edit Member" : "Add New Member"}
        </h2>

        {error && (
          <div
            className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm"
            style={{
              background: "var(--color-danger-light)",
              border: "1px solid var(--color-danger)",
              color: "var(--color-danger)",
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image Upload */}
          <div
            className="md:col-span-2 flex flex-col items-center rounded-xl p-5 cursor-pointer transition-colors duration-150"
            style={{
              border: isDragging
                ? "2px dashed var(--color-fyp-green)"
                : "2px dashed var(--color-border)",
              background: isDragging ? "rgba(1,68,33,0.04)" : "transparent",
            }}
            onClick={handleFileSelect}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <label
              className="text-sm font-medium mb-3 flex items-center gap-2 cursor-pointer"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ImageIcon size={16} /> Profile Image
            </label>
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden"
              style={{ border: "2px solid var(--color-border)" }}
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "var(--color-bg-base)" }}
                >
                  <User size={36} style={{ color: "var(--color-text-muted)" }} />
                </div>
              )}
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
              Click or drag to upload (max 5MB)
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />
          </div>

          {/* Fields */}
          {fields.map((field) => (
            <div key={field.name}>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                {field.label}
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {field.icon}
                </span>
                {field.type === "textArea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="fyp-input pl-9 min-h-[80px] resize-none"
                    style={{ paddingTop: "0.625rem" }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="fyp-input pl-9"
                  />
                )}
              </div>
              {field.name === "phone" && (
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  Max 11 digits (03001234567)
                </p>
              )}
              {field.name === "CNIC" && (
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  13 digits without dashes
                </p>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
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
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors duration-150"
              style={{
                background: loading ? "var(--color-text-muted)" : "var(--color-fyp-green)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "var(--color-fyp-green-light)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "var(--color-fyp-green)";
              }}
            >
              {loading
                ? member ? "Updating…" : "Creating…"
                : member ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default MemberModal;
