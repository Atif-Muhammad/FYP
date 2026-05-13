import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Medal,
  Globe,
  AtSign,
  Hash,
  MapPin,
  MessageSquare,
  UserRoundPen,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

function ExecutivesModal({ member, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "Chairman",
    about: "",
    district: "",
    livingIn: "",
    message: "",
    socials: { fb: "", insta: "", twitter: "" },
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        role: member.role || "Chairman",
        about: member.about || "",
        district: member.district || "",
        livingIn: member.livingIn || "",
        message: member.message || "",
        socials: member.socials || { fb: "", insta: "", twitter: "" },
        image: member.image || null,
      });
      if (member.image?.url) setPreview(member.image.url);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleImageChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleFileSelect = () => fileInputRef.current?.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      if (key === "socials") {
        data.append("socials", JSON.stringify(formData.socials));
      } else if (key === "image" && formData.image instanceof File) {
        data.append("image", formData.image);
      } else if (key === "image" && formData.image && !(formData.image instanceof File)) {
        data.append("existingImage", JSON.stringify(formData.image));
      } else {
        data.append(key, formData[key]);
      }
    }
    if (member?._id) data.append("_id", member._id);

    await onSubmit(data);
    setLoading(false);
    onClose();
  };

  const limitedToNameImageOnly = ["Chief Election Officer", "Youth Governor"].includes(formData.role);
  const advisorRoles = ["Legal Advisor", "Technical Advisor", "Political Advisor", "Financial Advisor", "Medical Advisor"];
  const isAdvisor = advisorRoles.includes(formData.role);
  const isPatron = formData.role === "Patron in Chief";
  const isLeader = ["Chairman", "President", "Vice President", "General Secretary"].includes(formData.role);

  const socialsFields = [
    { label: "Facebook", name: "fb", icon: <Globe size={14} /> },
    { label: "Instagram", name: "insta", icon: <AtSign size={14} /> },
    { label: "Twitter / X", name: "twitter", icon: <Hash size={14} /> },
  ];

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
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 relative"
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

        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}
        >
          {member ? "Edit Executive" : "Add New Executive"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>
              Role
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}>
                <Medal size={14} />
              </span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="fyp-input pl-9 appearance-none"
              >
                <option value="Chairman">Chairman</option>
                <option value="Vice President">Vice President</option>
                <option value="General Secretary">General Secretary</option>
                <option value="Patron in Chief">Patron in Chief</option>
                <option value="Legal Advisor">Legal Advisor</option>
                <option value="Technical Advisor">Technical Advisor</option>
                <option value="Political Advisor">Political Advisor</option>
                <option value="Financial Advisor">Financial Advisor</option>
                <option value="Medical Advisor">Medical Advisor</option>
                <option value="Chief Election Officer">Chief Election Officer</option>
                <option value="Youth Governor">Youth Governor</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div
            onClick={handleFileSelect}
            className="md:col-span-2 flex flex-col items-center rounded-xl p-5 cursor-pointer transition-colors duration-150"
            style={{ border: "2px dashed var(--color-border)" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-fyp-green-light)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
          >
            <label className="text-sm font-medium mb-3 flex items-center gap-2 cursor-pointer" style={{ color: "var(--color-text-secondary)" }}>
              <ImageIcon size={16} /> Profile Image
            </label>
            <div className="relative w-28 h-28 rounded-full overflow-hidden" style={{ border: "2px solid var(--color-border)" }}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
                  <User size={36} style={{ color: "var(--color-text-muted)" }} />
                </div>
              )}
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>Click to upload (max 5MB)</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} className="hidden" />
          </div>

          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><User size={14} /></span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {!limitedToNameImageOnly && (
            <>
              {(isAdvisor || isPatron || isLeader) && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Message</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><MessageSquare size={14} /></span>
                    <textarea name="message" value={formData.message} onChange={handleChange} className="fyp-input pl-9 min-h-[80px] resize-none" style={{ paddingTop: "0.625rem" }} />
                  </div>
                </div>
              )}

              {isLeader && (
                <>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>About</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><UserRoundPen size={14} /></span>
                      <textarea name="about" value={formData.about} onChange={handleChange} className="fyp-input pl-9 min-h-[80px] resize-none" style={{ paddingTop: "0.625rem" }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>District</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><MapPin size={14} /></span>
                      <input type="text" name="district" value={formData.district} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>Living In</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}><MapPin size={14} /></span>
                      <input type="text" name="livingIn" value={formData.livingIn} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <h3 className="text-xs font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                      <Globe size={14} /> Social Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {socialsFields.map((social) => (
                        <div key={social.name}>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-primary)" }}>{social.label}</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}>{social.icon}</span>
                            <input type="url" name={social.name} value={formData.socials[social.name] || ""} onChange={handleSocialChange} className={inputClass} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
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
              {loading ? (member ? "Updating…" : "Creating…") : (member ? "Update" : "Create")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ExecutivesModal;
