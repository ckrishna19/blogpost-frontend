// module import

import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
import { ImSwitch } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
import { logout } from "../redux/api";

import axios from "axios";
import Modal from "../utils/Modal";
import { useEffect } from "react";
import { persistor } from "../redux/store";
import UpdateImageModal from "./UpdateImage";
import { useNavigate } from "react-router-dom";

const Leftside = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user || {});
  const { loading } = useSelector((state) => state?.authInfo || {});
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onClose = (e) => {
    setShowModal((pre) => !pre);
  };

  const handleLogout = async () => {
    dispatch(logoutUser(logout));
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    await persistor.purge();
  };

  // useEffect(() => {
  //   const MyProfile = async () => {
  //     dispatch(fetchLoading());
  //     try {
  //       const { data } = await axios.get(getMyProfileApi, {
  //         withCredentials: true,
  //       });
  //       dispatch(getMyProfile(data.data));
  //     } catch (error) {
  //       dispatch(fetchError(error.response.data.message));
  //     }
  //   };
  //   MyProfile();
  // }, []);

  return (
    <main className="w-1/6 bg-white fixed left-0 top-21 h-full ">
      {showModal && <UpdateImageModal onClose={onClose} />}
      <main className="w-[90%] mx-auto py-2">
        <section className="flex-col flex gap-y-2 items-center justify-center">
          <article className="">
            <aside className="w-24 relative">
              <img
                src={
                  user?.photoUrl?.url ??
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
              {user?.firstName} {user?.lastName}
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
