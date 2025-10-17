
function Confirmation({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      ></div>

      <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-80 max-w-full">
        <p className="text-gray-800 mb-6">{message || "Are you sure?"}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#232A39] text-white hover:bg-[#1d2330] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
