import React, { useEffect, useState } from "react";
import Createpost from "./Createpost";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/actions/postAction";
import { allPost } from "../redux/api";
import Modal from "../utils/Modal";

const Feed = ({ showModal, closeModal, openModal }) => {
  const postList = useSelector((state) => state?.post?.postList);
  console.log(postList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost(allPost));
  }, [dispatch]);

  return (
    <main className="w-3/4 flex flex-col gap-y-6 mb-10 ">
      {showModal && <Createpost closeModal={closeModal} />}
      {postList?.length > 0 &&
        postList?.map((post) => <Post key={post?._id} {...post} />)}
    </main>
  );
};

export default Feed;
