import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateImageApi, updatePostApi } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction } from "../redux/actions/postAction";
import {
  fetchError,
  fetchPostLoading,
  updatePostSlice,
} from "../redux/slices/postSlice";

export const UpdatePost = ({
  onClose,
  onUpdated,
  _id,
  text: content,
  image: postImage,
}) => {
  const [text, setText] = useState(content || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(postImage || null);
  const [removeImage, setRemoveImage] = useState(false);
  const { loading, error } = useSelector((state) => state?.post);
  const handleRemoveImage = () => {
    setRemoveImage(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (postImage) {
      setPreview(postImage);
    }
  }, [postImage]);

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader?.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("removeImage", removeImage);
    formData.append("text", text);
    if (image) formData.append("image", image);

    //  dispatch(updatePostAction(`${updatePostApi}/${_id}`, formData));
    //    onClose();

    dispatch(fetchPostLoading());
    try {
      const { data } = await axios.patch(`${updatePostApi}/${_id}`, formData, {
        withCredentials: true,
      });
      dispatch(updatePostSlice(data.data));

      if (data.data) {
        onClose();
        setPreview(null);
        setImage(null);
        setText("");
      }
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      {error && <p className="text-xs font-light">{error}</p>}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Update Post</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <textarea
            className="w-full resize-none border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="preview"
                className="w-full rounded-md max-h-60 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setRemoveImage(true);
                }}
                className="absolute top-1 right-1 bg-white rounded-full text-xs px-2 py-1 shadow"
              >
                ✕ Remove
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-blue-500 cursor-pointer text-sm">
              📷 Update Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <button type="submit" className="px-4 py-2 text-sm cursor-pointer">
              {loading === true ? "Updating" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
