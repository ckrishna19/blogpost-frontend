// module import

import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
import { ImSwitch } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import {
  fetchAuth,
  fetchError,
  getMyProfile,
  logOut,
  fetchLoadingUser,
} from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
import { getMyProfileApi, logout, updateImageApi } from "../redux/api";

import axios from "axios";
import Modal from "../utils/Modal";
import { fetchLoading } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { persistor } from "../redux/store";

const Leftside = () => {
  const { loadingUser, error, userInfo, loading } = useSelector(
    (state) => state?.authInfo
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onClose = (e) => {
    setShowModal((pre) => !pre);
  };

  const handleLogout = async () => {
    dispatch(logoutUser(logout));
    localStorage.removeItem("loggedInUser");
    await persistor.purge();
  };

  useEffect(() => {
    const MyProfile = async () => {
      dispatch(fetchLoading());
      try {
        const { data } = await axios.get(getMyProfileApi, {
          withCredentials: true,
        });
        dispatch(getMyProfile(data.data));
      } catch (error) {
        dispatch(fetchError(error.response.data.message));
      }
    };
    MyProfile();
  }, []);

  const updateImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);
    dispatch(fetchLoadingUser());
    try {
      const { data } = await axios.patch(updateImageApi, formData, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        dispatch(fetchAuth(data.data));
        setPreview(null);
        setShowModal(false);
      }
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
    }
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    file && setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  return (
    <main className="w-1/6 bg-white fixed left-0 top-21 h-full ">
      {showModal && (
        <Modal onClose={onClose}>
          {error && <p>{error}</p>}
          <label
            hidden={preview}
            htmlFor="image"
            className="text-xs rounded text-blue-500 cursor-pointer"
          >
            Upload
          </label>
          <input
            type="file"
            name="image"
            id="image"
            hidden
            onChange={handleChangeImage}
          />
          {preview && (
            <>
              <img src={preview} className="w-60 aspect-video" />
              <button
                onClick={updateImage}
                className="cursor-pointer mt-2 border rounded-md px-2  py-1"
              >
                {loadingUser ? "Uploading...." : "Upload"}
              </button>
              <button
                onClick={() => setPreview(null)}
                className="cursor-pointer mt-2 border rounded-md px-2  py-1 ml-3"
              >
                Remove
              </button>
            </>
          )}
        </Modal>
      )}
      <main className="w-[90%] mx-auto py-2">
        <section className="flex-col flex gap-y-2 items-center justify-center">
          <article className="">
            <aside className="w-24 relative">
              <img
                src={
                  userInfo?.photoUrl?.url ??
                  "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                }
                alt="user profile"
                className="w-full aspect-square rounded-md bg-pink-200"
              />
            </aside>
            <button
              className="text-xs border p-1 rounded-md mt-1 cursor-pointer"
              onClick={onClose}
            >
              Update image
            </button>
            <p className="text-md font-semibold">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
          </article>
          <article className="">
            <p className="text-[#FF5A60] font-semibold">Explore panels</p>
            <aside className="flex flex-col gap-y-2 mt-2">
              <div className="flex items-center gap-x-2">
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#A9DEF9]">
                  <MdManageAccounts size={20} color="black" />
                </div>
                <p className="text-sm font-bold">Profile</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#A9DEF9]">
                  <IoIosPeople size={20} color="black" />
                </div>
                <p className="text-sm font-bold">Find Friends</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#A9DEF9]">
                  <MdTrendingUp size={20} color="black" />
                </div>
                <p className="text-sm font-bold">User Analytics</p>
              </div>
            </aside>
          </article>

          <article className="">
            <p className="text-[#FF5A60] font-semibold">Settings</p>
            <aside className="flex flex-col gap-y-2 mt-2">
              <div className="flex items-center gap-x-2">
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#A9DEF9]">
                  <IoSettings size={20} color="black" />
                </div>
                <p className="text-sm font-bold">Settings</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#A9DEF9]">
                  <FaLock size={20} color="black" />
                </div>
                <p className="text-sm font-bold">Security data</p>
              </div>
              <button
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={handleLogout}
              >
                <div className="w-8 aspect-square rounded justify-center items-center flex bg-[#D90429]">
                  <ImSwitch size={20} color="black" />
                </div>
                <p className="text-sm font-bold">
                  {!!loading ? "Logging out.." : "Logout"}
                </p>
              </button>
            </aside>
          </article>
        </section>
      </main>
    </main>
  );
};

export default Leftside;
