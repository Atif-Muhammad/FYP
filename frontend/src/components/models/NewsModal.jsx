import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, ImagePlus, Trash2 } from "lucide-react";

function NewsModal({ update, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    validity: "",
    image: null, // File or existing object
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validityOptions = [
    "24 hours",
    "2 days",
    "3 days",
    "4 days",
    "1 week",
    "Until I change",
  ];

  // 🟡 Preload existing data when editing
  useEffect(() => {
    if (update) {
      setFormData({
        title: update.title || "",
        description: update.description || "",
        validity: update.validity || "",
        image: update.image || null,
      });

      // Support both Cloudinary & base64
      if (update.image?.url) setPreview(update.image.url);
     
      else setPreview("");
    }
  }, [update]);

  // 🟢 Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length > 0) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🟢 Drag-and-drop
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
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🧹 Remove image manually
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setPreview("");
  };

  // 🟢 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev=> !prev);
    console.log(loading);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("validity", formData.validity);
    if (update) data.append("_id", update._id);

    await onSubmit(data);
    setLoading(prev=>!prev);
  };

  return (
    <div className="fixed inset-0 py-24 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative  max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          {update ? "Edit Update" : "Add Update"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Update Title"
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Update Description"
            rows="5"
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            required
          />

          {/* Validity Dropdown */}
          <select
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            required
          >
            <option value="" disabled>
              Select validity duration
            </option>
            {validityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Image Upload / Preview */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer ${dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
              }`}
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus size={40} className="mb-2" />
                <p className="text-sm">
                  Drag & drop an image here or click to upload
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#101828] hover:bg-[#101828eb] text-white rounded-lg py-2.5 font-medium transition-colors flex items-center justify-center"
          >
            {loading && <Loader2 className="animate-spin mr-2" size={20} />}
            {loading
              ? "Submitting..."
              : update
                ? "Update Record"
                : "Create Record"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsModal;
