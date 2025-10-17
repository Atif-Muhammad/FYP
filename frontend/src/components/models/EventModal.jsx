import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, FileText, X, Loader2 } from "lucide-react";

function EventModal({ event, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
  });
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
    data.append("title", formData.title)
    data.append("description", formData.description);
    data.append("eventDate", formData.eventDate)
    data.append("location", formData.location)

    if (event) data.append("_id", event._id);

    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }

    await onSubmit(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {event ? "Edit Event" : "Add New Event"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter event title"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full border rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Venue / Address"
                className="w-full border rounded-md pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="7"
              placeholder="Event details, purpose, etc."
              className="w-full border rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center min-w-[130px]"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" size={20} />
              ) : event ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EventModal;
