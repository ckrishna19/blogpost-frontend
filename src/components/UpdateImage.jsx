import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { updateImageApi } from "../redux/api";
import {
  clearUserError,
  fetchUserError,
  loadingUserSlice,
  updateImageSlice,
} from "../redux/slices/userSlice";

const UpdateImageModal = ({ onClose }) => {
  // Redux and states

  const { loading, error } = useSelector((state) => state?.user || {});
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Clear error if there is Error
  useEffect(() => {
    let timeOut;
    if (error) {
      timeOut = setTimeout(() => {
        dispatch(clearUserError());
      }, 3000);
    }
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [error, dispatch]);

  // Functions for handle change...

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    dispatch(loadingUserSlice());
    try {
      const { data } = await axios.patch(updateImageApi, formData, {
        withCredentials: true,
      });
      if (data?.statusCode === 201) {
        dispatch(updateImageSlice(data?.data));
        setImage(null);
        setPreview(null);
        onClose();
      }
    } catch (error) {
      dispatch(fetchUserError(error?.response?.data?.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Update Profile Image
        </h2>

        {error && <p className="text-xs text-red-500 my-1">{error} </p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-white text-red-500 rounded-full shadow"
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-gray-500">Click to select image</span>
            </label>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!image}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateImageModal;
