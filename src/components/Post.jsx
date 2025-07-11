import React, { useCallback, useEffect } from "react";
import Comment from "./Comment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment, writeComment } from "../redux/actions/commentAction";
import {
  allCommentApi,
  deletePostApi,
  likeListApi,
  likePostApi,
  newCommentApi,
  unLikePostApi,
} from "../redux/api";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  fetchLikeError,
  fetchLikeList,
  fetchLikeLoading,
  likePostByUser,
  unLikePost,
} from "../redux/slices/likeSlice";
import axios from "axios";
import {
  deletePostSlice,
  fetchError,
  fetchPostLoading,
} from "../redux/slices/postSlice";
import { MdDelete } from "react-icons/md";
import { IoCreateOutline, IoTrendingUp } from "react-icons/io5";
import { UpdatePost } from "./UpdatePost";
import ConfirmDelete from "../utils/ConfirmDelete";
import {
  fetchCommentLoading,
  getCommentError,
} from "../redux/slices/commentSlice";
// function

const Post = ({
  image,
  text,
  postedBy,
  _id,
  commentCount,
  likeCount,
  likedByIds,
}) => {
  // state and redux
  const dispatch = useDispatch();
  const [openComment, setOpenComment] = useState(false);
  const [count, setCount] = useState(commentCount);
  const { userInfo } = useSelector((state) => state?.authInfo || {});
  const { loading, error } = useSelector((state) => state.post);
  const { commentMap } = useSelector((state) => state?.comment || {});
  const { likeMap } = useSelector((state) => state?.like);
  //  const [updateLike, setUpdateLike] = useState(likeCount);
  const [liked, setLiked] = useState(likedByIds?.includes(userInfo?._id));
  const [updateLike, setUpdateLike] = useState(likeCount);
  const [updatePost, setUpdatePost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  const onClose = () => {
    setUpdatePost((pre) => !pre);
  };

  const confirmDelete = async (id) => {
    dispatch(fetchPostLoading());
    try {
      const { data } = await axios.delete(`${deletePostApi}/${id}`, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        dispatch(deletePostSlice(id));
        onCencelDeletePost();
      }
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
    }
  };

  const onCencelDeletePost = () => {
    setDeletePost((pre) => !pre);
  };

  const handleLikePost = async (id) => {
    dispatch(fetchLikeLoading());
    try {
      const { data } = await axios.post(
        likePostApi,
        { postId: id },
        { withCredentials: true }
      );
      console.log(data?.data);
      dispatch(likePostByUser({ postId: id, likedBy: data?.data.likedBy }));
    } catch (error) {
      dispatch(fetchLikeError(error?.response?.data?.message));
    }
  };

  const handleUnLikePost = async (id) => {
    dispatch(fetchLikeLoading());
    try {
      const { data } = await axios.delete(`${unLikePostApi}/${id}`, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        dispatch(unLikePost({ postId: id, unLikedBy: userInfo?._id }));
      }
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
    }
  };

  const handleAddCount = useCallback(() => {
    setCount((pre) => pre++);
  }, []);

  const handleDeleteTheComment = useCallback(() => {
    setCount((pre) => pre--);
  }, []);

  const handleOpenComment = (id) => {
    if (id === _id) {
      setOpenComment((pre) => !pre);
    }
  };

  // fetching api use Effects..

  // fetch like count,

  useEffect(() => {
    const likeFetch = async () => {
      dispatch(fetchLikeLoading());
      try {
        const { data } = await axios.get(`${likeListApi}/${_id}`, {
          withCredentials: true,
        });
        const likedBy = data?.data.map((x) => x.likedBy);

        dispatch(fetchLikeList({ postId: id, likedBy }));
      } catch (error) {
        dispatch(fetchLikeError(error?.response?.data?.message));
      }
    };
    likeFetch();
  }, [dispatch, _id, userInfo?._id]);

  // jsx return..

  return (
    <>
      <main className=" bg-white rounded-md shadow p-4">
        <section className="flex items-center">
          <article className="flex gap-x-4 items-center">
            <aside className="bg-pink-200 w-14 aspect-square rounded-md">
              <img
                src={
                  postedBy?.photoUrl?.url ??
                  "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                }
                alt="profile-image-tony"
                className="w-[96%] aspect-square"
              />
            </aside>
            <aside>
              <div className="flex items-center gap-x-2">
                <p className="text-md font-medium ">
                  {postedBy?.firstName + " " + postedBy?.lastName}
                </p>
                <p className="font-light text-xs">{postedBy?.email}</p>
              </div>
              <div>
                <p className="text-sm ">
                  Cognitive Person | Enthusiastic scientist | Worked on 300.....
                </p>
              </div>
            </aside>
          </article>
          {userInfo?._id === postedBy?._id && (
            <aside className="ml-auto flex gap-x-3">
              <button
                className="w-8 aspect-square rounded-md border cursor-pointer flex justify-center items-center"
                onClick={onCencelDeletePost}
              >
                <MdDelete />
              </button>
              <button
                className="w-8 aspect-square rounded-md border cursor-pointer flex justify-center items-center"
                onClick={onClose}
              >
                <IoCreateOutline />
              </button>
            </aside>
          )}
        </section>
        <section className="ml-18 mt-4">
          <p className="text-xs">{text}</p>
          {image && (
            <img
              src={image}
              alt="post-image"
              className="mt-1 w-full aspect-video"
            />
          )}
        </section>
        <section className="flex justify-around mt-4 items-center text-xs">
          <div className="flex gap-x-1 items-end">
            <p className="text-xs">{likeMap[_id]?.length}</p>
            <button
              className="cursor-pointer"
              onClick={() =>
                likeMap[_id]?.includes(userInfo?._id)
                  ? handleUnLikePost(_id)
                  : handleLikePost(_id)
              }
            >
              {likeMap[_id]?.includes(userInfo?._id) ? (
                <AiFillLike size={16} className="text-blue-600" />
              ) : (
                <AiOutlineLike size={16} className="text-blue-600" />
              )}
            </button>
          </div>
          <button
            className=" cursor-pointer text-xs"
            onClick={() => handleOpenComment(_id)}
          >
            {commentMap[_id]?.length}
            comments
          </button>
        </section>
        {openComment && (
          <Comment
            id={_id}
            handleAddCount={handleAddCount}
            postedBy={postedBy}
            handleDeleteTheComment={handleDeleteTheComment}
          />
        )}
      </main>

      {updatePost && (
        <UpdatePost onClose={onClose} _id={_id} text={text} image={image} />
      )}
      {deletePost && (
        <ConfirmDelete
          onCancel={onCencelDeletePost}
          onConfirm={confirmDelete}
          id={_id}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
};

export default Post;
