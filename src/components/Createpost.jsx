// import React, { useRef, useState } from "react";
// import { IoMdCreate } from "react-icons/io";
// import { CiImageOn } from "react-icons/ci";
// import { FaPlayCircle } from "react-icons/fa";

// /*
// if (heightRef.current) {
//       heightRef.current.style.height = "40px";
//       heightRef.current.style.height =
//         heightRef.current.scrollHeight + "" + "px";
//       setInput(e.target.value);
//     }

// */

// const Createpost = () => {
//   const [text, setText] = useState("");
//   const textRef = useRef(null);
//   const handleChangeText = (e) => {
//     if (textRef.current) {
//       textRef.current.style.height = 48;
//       textRef.current.style.height = textRef.current.scrollHeight;
//       setText(e.target.value);
//     }
//   };
//   return (
//     <main className="bg-white shadow rounded-md">
//       <section className="p-4 flex flex-col gap-y-3">
//         <article className="flex justify-around">
//           <aside className="flex">
//             <div className="flex items-center gap-x-2 cursor-pointer">
//               <div className="flex justify-center items-center w-8 aspect-square rounded-full bg-[#FFEE93]">
//                 <IoMdCreate color="black" size={16} />
//               </div>

//               <p className="text-xs font-semibold">Write a post</p>
//             </div>
//           </aside>
//           <aside className="flex">
//             <div className="flex items-center gap-x-2 cursor-pointer">
//               <div className="flex justify-center items-center w-8 aspect-square rounded-full bg-[#FFEE93]">
//                 <CiImageOn color="black" size={16} />
//               </div>

//               <p className="text-xs font-semibold">Upload Photo</p>
//             </div>
//           </aside>
//           <aside className="flex">
//             <div className="flex items-center gap-x-2 cursor-pointer">
//               <div className="flex justify-center items-center w-8 aspect-square rounded-full bg-[#FFEE93]">
//                 <FaPlayCircle color="black" size={16} />
//               </div>

//               <p className="text-xs font-semibold">Upload video</p>
//             </div>
//           </aside>
//         </article>
//         <article className="border border-gray-100" />
//         <article className="bg-[#F1FAFF]">
//           <aside className="flex items-start gap-x-4 py-3">
//             <IoMdCreate size={16} />
//             <textarea
//               placeholder="write something here"
//               className=" flex-1 resize-none focus:outline-none px-2"
//               cols={1}
//               value={text}
//               onChange={handleChangeText}
//               ref={textRef}
//               style={{
//                 height: (textRef.current && textRef.current.scrollHeight) || 48,
//               }}
//             />
//           </aside>
//         </article>
//       </section>
//     </main>
//   );
// };

// export default Createpost;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../redux/actions/postAction";
import { createPostApi } from "../redux/api";
// --- Existing LoginPage and RegisterPage code remains unchanged ---

// --- Existing LoginPage and RegisterPage code remains unchanged ---

const CreatePost = ({ closeModal }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const post = useSelector((state) => state?.post);
  console.log(post);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);
    dispatch(newPost(formData, createPostApi));
    setImage(null);
    setPreview(null);
    setText("");
    closeModal();
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
              {post?.loading === true ? "Loading..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
