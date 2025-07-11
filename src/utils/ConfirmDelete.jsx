import React from "react";
import { useSelector } from "react-redux";
const ConfirmDelete = ({ onCancel, onConfirm, id, loading, error }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Are you sure?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Do you really want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            {loading === true ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
