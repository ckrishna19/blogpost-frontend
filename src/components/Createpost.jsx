import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../redux/actions/postAction";
import { createPostApi } from "../redux/api";
import {
  clearPostError,
  createPost,
  fetchError,
  fetchPostLoading,
} from "../redux/slices/postSlice";
import axios from "axios";
// --- Existing LoginPage and RegisterPage code remains unchanged ---

// --- Existing LoginPage and RegisterPage code remains unchanged ---

const CreatePost = ({ closeModal }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state?.post);

  useEffect(() => {
    let timeOut;
    if (error) {
      timeOut = setTimeout(() => {
        dispatch(clearPostError());
      }, 3000);
    }
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [error, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);
    dispatch(fetchPostLoading());
    try {
      const { data } = await axios.post(createPostApi, formData, {
        withCredentials: true,
      });
      if (data?.statusCode === 201) {
        dispatch(createPost(data?.data));
        setImage(null);
        setPreview(null);
        setText("");
        closeModal();
      }
    } catch (error) {
      dispatch(fetchError(error?.response?.data?.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Create Post</h2>

        {error && <p className="text-xs text-red-500 my-1">{error} </p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full resize-none border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder={`What's on your mind, ${user?.firstName}?`}
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
                }}
                className="absolute top-1 right-1 bg-white rounded-full text-xs px-2 py-1 shadow cursor-pointer"
              >
                ✕ Remove
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-blue-500 cursor-pointer text-sm">
              📷 Add Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <button type="submit" className="px-4 py-2 text-sm cursor-pointer">
              {loading === true ? "Loading..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
