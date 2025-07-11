import React from "react";
import brandImage from "../assets/brand-image.png";
import { CiSearch } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoIosCreate } from "react-icons/io";

const Header = ({ openModal }) => {
  const auth = useSelector((state) => state?.authInfo);

  return (
    <main className="bg-[#A9DEF9] h-20 flex items-center fixed left-0 right-0 w-full shadow shadow-black">
      <section className="w-[90vw] mx-auto">
        <article className="w-[90%] mx-auto flex gap-x-6 items-center">
          <aside>
            <img
              src={brandImage}
              alt="brand-image"
              className="h-14 aspect-square rounded cursor-pointer"
            />
          </aside>
          <aside className="h-12 bg-white rounded shadow-md shadow-black flex-1 ">
            <div className="flex items-center gap-x-3 h-full py-auto px-2 mx-4">
              <CiSearch size={24} className="cursor-pointer" />
              <input
                type="text"
                name=""
                placeholder="Search your friend"
                className=" h-[90%] focus:outline-none flex-1"
              />
            </div>
          </aside>
          <aside className="flex gap-x-10">
            <div className="flex">
              <div className="bg-pink-200 h-12 rounded-md shadow-black shadow-md">
                <img
                  src={auth?.userInfo?.photoUrl?.url}
                  alt="profile image"
                  className="h-full aspect-square rounded-md cursor-pointer"
                />
              </div>
              <div className="block ml-3 items-center">
                <p className=" font-semibold text-sm">
                  {auth?.userInfo?.firstName + " " + auth?.userInfo?.lastName}
                </p>
                <p className="text-xs font-light">{auth?.userInfo?.email}</p>
              </div>
            </div>
            <div className="flex gap-x-3">
              <button
                className="flex items-center justify-center cursor-pointer bg-white h-12 aspect-square rounded-md"
                onClick={openModal}
              >
                <IoIosCreate size={24} color="black" />
              </button>
              <button className="flex items-center justify-center cursor-pointer bg-white h-12 aspect-square rounded-md">
                <FaLightbulb size={24} color="black" />
              </button>
              <div className="flex items-center justify-center cursor-pointer bg-white h-12 aspect-square rounded-md">
                <IoIosNotifications size={24} color="black" />
              </div>
            </div>
          </aside>
        </article>
      </section>
    </main>
  );
};

export default Header;
