import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Medal,
  Globe,
  Instagram,
  Twitter,
  MapPin,
  MessageSquare,
  UserRoundPen,
} from "lucide-react";

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
  const [loading, setLoading] = useState(false); // ✅ new loading state
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
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleFileSelect = () => fileInputRef.current?.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ stop double submit
    setLoading(true);

    const data = new FormData();

    for (const key in formData) {
      if (key === "socials") {
        data.append("socials", JSON.stringify(formData.socials));
      } else if (key === "image" && formData.image instanceof File) {
        data.append("image", formData.image);
      } else if (
        key === "image" &&
        formData.image &&
        !(formData.image instanceof File)
      ) {
        data.append("existingImage", JSON.stringify(formData.image));
      } else {
        data.append(key, formData[key]);
      }
    }

    if (member?._id) data.append("_id", member._id);

    await onSubmit(data);
    setLoading(false);
  };

  const limitedToNameImageOnly = [
    "Chief Election Officer",
    "Youth Governor",
  ].includes(formData.role);

  const advisorRoles = [
    "Legal Advisor",
    "Technical Advisor",
    "Political Advisor",
    "Finance Advisor",
  ];
  const isAdvisor = advisorRoles.includes(formData.role);
  const isPatron = formData.role === "Patron in Chief";
  const isLeader = [
    "Chairman",
    "President",
    "Vice President",
    "General Secretary",
  ].includes(formData.role);

  const socialsFields = [
    { label: "Facebook", name: "fb", icon: <Globe size={16} /> },
    { label: "Instagram", name: "insta", icon: <Instagram size={16} /> },
    { label: "Twitter / X", name: "twitter", icon: <Twitter size={16} /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {member ? "Edit Executive" : "Add New Executive"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Role */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Medal size={18} />
              </span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Chairman">Chairman</option>
                <option value="Vice President">Vice President</option>
                <option value="General Secretary">General Secretary</option>
                <option value="Patron in Chief">Patron in Chief</option>
                <option value="Legal Advisor">Legal Advisor</option>
                <option value="Technical Advisor">Technical Advisor</option>
                <option value="Political Advisor">Political Advisor</option>
                <option value="Finance Advisor">Finance Advisor</option>
                <option value="Chief Election Officer">
                  Chief Election Officer
                </option>
                <option value="Youth Governor">Youth Governor</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div
            onClick={handleFileSelect}
            className="md:col-span-2 flex flex-col items-center border border-dashed rounded-xl p-4 cursor-pointer hover:border-blue-400 transition"
          >
            <label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              <ImageIcon size={18} /> Profile Image
            </label>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300">
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
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {!limitedToNameImageOnly && (
            <>
              {(isAdvisor || isPatron || isLeader) && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      <MessageSquare size={18} />
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {isLeader && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      About
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">
                        <UserRoundPen size={18} />
                      </span>
                      <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      District
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <MapPin size={18} />
                      </span>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Living In
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <MapPin size={18} />
                      </span>
                      <input
                        type="text"
                        name="livingIn"
                        value={formData.livingIn}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 border-t pt-4 mt-2">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Globe size={18} /> Social Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {socialsFields.map((social) => (
                        <div key={social.name}>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            {social.label}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              {social.icon}
                            </span>
                            <input
                              type="url"
                              name={social.name}
                              value={formData.socials[social.name] || ""}
                              onChange={handleSocialChange}
                              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading} // ✅ disable during submit
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading} // ✅ disable during submit
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? member
                  ? "Updating..."
                  : "Creating..."
                : member
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ExecutivesModal;
