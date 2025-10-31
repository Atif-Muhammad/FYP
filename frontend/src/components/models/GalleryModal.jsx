import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

function GalleryModal({ photo, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (photo) {
      setFormData({
        title: photo.title || "",
        description: photo.description || "",
        image: null, // null means no new image yet
      });
      setPreview(
        photo.image?.base64
          ? `data:${photo.image.mimetype};base64,${photo.image.base64}`
          : photo.image?.url || ""
      );
    }
  }, [photo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    // ✅ Handle image cases
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else if (photo?.image) {
      // keep existing image
      data.append("image", JSON.stringify(photo.image));
    }

    if (photo?._id) data.append("_id", photo._id);

    await onSubmit(data);
    setLoading(false);
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          {photo ? "Edit Photo" : "Add New Photo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Photo Title"
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#101828] outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Photo Description"
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#101828] outline-none resize-none"
            required
          />

          {/* Drag & Drop Image Upload */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer ${
              dragActive
                ? "border-[#101828] bg-green-50"
                : "border-gray-300 hover:border-[#101828]"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus size={40} className="mb-2" />
                <p className="text-sm text-center">
                  Drag & drop an image here <br /> or click to upload
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
              ? photo
                ? "Updating..."
                : "Submitting..."
              : photo
              ? "Update Photo"
              : "Create Photo"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default GalleryModal;
