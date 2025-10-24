import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Medal,
  Globe,
  Instagram,
  Twitter,
  UserRoundPen,
  Pin,
  IdCard,
  Calendar,
  Mail,
  Phone,
  UserCircle2,
} from "lucide-react";

function MemberModal({ member, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    CNIC: "",
    DOB: "",
    email: "",
    phone: "",
    pk: "",
    district: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        DOB: member.DOB ? new Date(member.DOB).toISOString().split("T")[0] : "",
        image: member.image,
      });
      setPreview(member.image.url);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone") newValue = value.replace(/\D/g, "").slice(0, 11);
    if (name === "CNIC") newValue = value.replace(/\D/g, "").slice(0, 13);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
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
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const normalizedData = {
      ...formData,
      DOB: formData.DOB ? new Date(formData.DOB).toISOString() : "",
    };

    for (const key in normalizedData) {
       if (key === "image" && normalizedData.image instanceof File) {
        data.append("image", normalizedData.image); // new upload
      } else if (key === "image" && typeof normalizedData.image === "object") {
        data.append("image", JSON.stringify(normalizedData.image)); // existing image object
      } else {
        data.append(key, normalizedData[key]);
      }
    }

    await onSubmit(data);
  };

  const fields = [
    { label: "Name", name: "name", type: "text", icon: <User size={18} /> },
    {
      label: "Father Name",
      name: "father_name",
      type: "text",
      icon: <UserCircle2 size={18} />,
    },
    { label: "CNIC", name: "CNIC", type: "text", icon: <IdCard size={18} /> },
    {
      label: "Date of Birth",
      name: "DOB",
      type: "date",
      icon: <Calendar size={18} />,
    },
    {
      label: "District",
      name: "district",
      type: "text",
      icon: <Pin size={18} />,
    },
    { label: "PK", name: "pk", type: "text", icon: "PK-" },
    { label: "Email", name: "email", type: "email", icon: <Mail size={18} /> },
    { label: "Phone", name: "phone", type: "text", icon: <Phone size={18} /> },
    {
      label: "About",
      name: "about",
      type: "textArea",
      icon: <UserRoundPen size={18} />,
    },
  ];

  const highRoles = ["President", "Vice President", "General Secretary"];
  const isHighRole = highRoles.includes(formData.role);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {member ? "Edit Member" : "Add New Member"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Image Upload / Drag & Drop */}
          <div
            className={`md:col-span-2 flex flex-col items-center border border-dashed rounded-xl p-4 transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
          >
            <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2 cursor-pointer">
              <ImageIcon size={18} /> Profile Image
            </label>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">
              Drag & drop an image or click to select
            </p>
          </div>

          {/* Fields */}
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {field.icon}
                </span>
                {field.type === "textArea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              {field.name === "phone" && (
                <p className="text-xs text-gray-500 mt-1">
                  Max 11 digits (e.g., 03001234567)
                </p>
              )}
              {field.name === "CNIC" && (
                <p className="text-xs text-gray-500 mt-1">
                  13 digits without dashes (e.g., 3520212345671)
                </p>
              )}
            </div>
          ))}


          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {member ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default MemberModal;
