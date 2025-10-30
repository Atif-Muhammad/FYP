import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, ImagePlus } from "lucide-react";

function ProgramModal({ program, onClose, onSubmit }) {
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
    if (program) {
      setFormData({
        title: program.title || "",
        description: program.description || "",
        image: program.image || null, // existing image object
      });
      setPreview(
        program.image?.base64
          ? `data:${program.image.mimetype};base64,${program.image.base64}`
          : program.image?.url || ""
      );
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (program) data.append("_id", program._id);

    // ⬇️ Send either a new image file OR the existing image object
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else if (formData.image && typeof formData.image === "object") {
      data.append("image", JSON.stringify(formData.image));
    }

    await onSubmit(data);
    setLoading(false);
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          {program ? "Edit Program" : "Add Program"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Program Title"
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Program Description"
            rows="6"
            className="w-full border rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Image Upload */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
            onClick={() => fileInputRef.current.click()}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#101828] hover:bg-[#101828eb] text-white rounded-lg py-2.5 font-medium transition-colors flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {loading
              ? "Submitting..."
              : program
              ? "Update Program"
              : "Create Program"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProgramModal;
