import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../redux/actions/userAction";
import { userListApi } from "../redux/api";

const Rightside = () => {
  const dispatch = useDispatch();
  const { userList: users } = useSelector((state) => state?.user || {});

  useEffect(() => {
    dispatch(userList(userListApi));
  }, [dispatch]);

  return (
    <main className="w-1/4">
      <main className=" mx-auto flex flex-col gap-y-2">
        <section className="bg-white p-2 flex flex-col gap-y-3 rounded-md">
          <p className="text-[#FF5A60]">People you may know</p>
          {users?.length > 0 &&
            users.map((u) => (
              <aside className="flex items-center gap-x-2" key={u._id}>
                <div className="w-16 aspect-square rounded-md bg-pink-200">
                  <img
                    src={u?.photoUrl?.url}
                    alt="profile iamge"
                    className="w-full aspect-square"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="font-light text-[10px]">
                    Lorem ipsum dolor sit amet
                  </p>
                  <p className="text-[#4361EE] text-[10px] font-semibold">
                    6M followers
                  </p>
                </div>
              </aside>
            ))}
        </section>
        <section className="bg-white p-2 flex flex-col gap-y-1 rounded-md">
          <p className="text-[#FF5A60]">Boost your post</p>
          <aside>
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/850/606/non_2x/special-sale-up-to-30-percent-off-sale-banner-template-design-with-dynamic-aqua-color-background-and-bright-color-applicable-for-promotional-social-media-post-marketing-kit-free-vector.jpg"
              alt="post image"
              className="w-full aspect-video"
            />
            <p className="font-light text-xs text-black">
              <span className="text-xs font-semibold mr-1">
                @krishna_chalise
              </span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              voluptates.
              <span className="text-[#4361EE] text-xs font-semibold ml-1">
                you and 200 liked your post
              </span>
            </p>
          </aside>
        </section>
      </main>
    </main>
  );
};

export default Rightside;
