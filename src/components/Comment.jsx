import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import {
  createComment,
  getComments,
  getCommentError,
  fetchCommentLoading,
  clearCommentError,
  deleteCommentSlice,
} from "../redux/slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { allCommentApi, newCommentApi } from "../redux/api";

import { MdDelete } from "react-icons/md";
import { deleteCommentApi } from "../redux/api";
import ConfirmDelete from "../utils/ConfirmDelete";
// functions

const Comment = ({ id, postedBy, handleDeleteTheComment, handleAddCount }) => {
  const dispatch = useDispatch();
  const {
    commentList,
    comment: newComment,
    commentError,
    commentLoading,
    commentMap,
  } = useSelector((state) => state?.comment || {});
  console.log(commentMap);

  const { userInfo } = useSelector((state) => state?.authInfo || {});

  const [text, setComment] = useState("");
  const commentRef = useRef();
  const [deleteComment, setDeleteComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const handleDelete = (id) => {
    setCommentId(id);
    setDeleteComment((pre) => !pre);
  };

  const handleSendComment = async (e) => {
    e.preventDefault();

    const info = { postId: id, text };

    try {
      const { data } = await axios.post(newCommentApi, info, {
        withCredentials: true,
      });

      if (data?.data) {
        dispatch(createComment({ postId: id, comment: data?.data }));
        setComment("");
        handleAddCount();
      }
      if (commentRef?.current) {
        commentRef.current.style.height = "auto";
      }
    } catch (error) {
      dispatch(getCommentError(error?.response?.data?.message));
    }
  };
  useEffect(() => {
    const getAllComments = async () => {
      dispatch(fetchCommentLoading());
      try {
        const { data } = await axios.get(
          `${allCommentApi}/${id}`,

          {
            withCredentials: true,
          }
        );

        dispatch(getComments({ postId: id, commentList: data?.data }));
      } catch (error) {
        dispatch(getCommentError(error.response.data.message));
      }
    };
    getAllComments();
  }, [dispatch, id, commentMap[id]?.length]);

  // const deleteComments = (id) => {
  //   dispatch(deleteCommentAction(`${deleteCommentApi}/${id}`, id));
  //   handleDeleteTheComment();
  // };

  // const handleDeleteComment = async (id) => {
  //   dispatch(fetchCommentLoading());
  //   try {
  //     const { data } = await axios.delete(`${deleteCommentApi}/${id}`, {
  //       withCredentials: true,
  //     });
  //     dispatch(deleteComment(data.data));
  //     handleDeleteTheComment();
  //   } catch (error) {
  //     dispatch(getCommentError(error.response.data.message));
  //   }
  // };

  const deleteCommentByAuther = async (ids) => {
    dispatch(fetchCommentLoading());
    try {
      const { data } = await axios.delete(`${deleteCommentApi}/${ids}`, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        dispatch(deleteCommentSlice({ commentId: ids, postId: id }));
        handleDelete();
      }
    } catch (error) {
      dispatch(getCommentError(error?.response?.data?.message || null));
    }
  };

  return (
    <>
      {deleteComment && (
        <ConfirmDelete
          onCancel={handleDelete}
          id={commentId}
          onConfirm={deleteCommentByAuther}
          error={commentError}
          loading={commentLoading}
        />
      )}
      <main className="mt-2 ml-20">
        {commentMap[id]?.length > 0 &&
          commentMap[id]?.map((cmt) => (
            <section className="flex gap-x-2 items-start my-2" key={cmt._id}>
              <div className="flex items-start w-[150px] gap-x-1">
                <img
                  src={cmt?.commentedBy?.photoUrl?.url}
                  alt="profile-image"
                  className="w-8 aspect-square rounded-full"
                />
                <div className="block ">
                  <p className="text-xs">
                    {cmt?.commentedBy?.firstName +
                      " " +
                      cmt?.commentedBy?.lastName}
                  </p>
                  <p className="text-[10px] ">{cmt?.commentedBy?.email}</p>
                </div>
              </div>

              <p className="text-[10px] font-light flex-1">{cmt.text}</p>
              {[cmt?.commentedBy?._id, postedBy?._id].includes(
                userInfo?._id
              ) && (
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(cmt?._id)}
                >
                  <MdDelete size={12} />
                </button>
              )}
            </section>
          ))}

        <section className="flex gap-x-2 items-start">
          <img
            src={userInfo?.photoUrl?.url}
            className="w-8 aspect-square rounded-full"
          />
          <textarea
            type="text"
            name=""
            rows={1}
            id=""
            placeholder={`Write comment as ${userInfo?.firstName}`}
            value={text}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border rounded-lg py-1 px-3 focus:outline-none resize-none overflow-hidden text-xs"
            ref={commentRef}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button onClick={handleSendComment} className=" cursor-pointer">
            <IoIosSend size={30} />
          </button>
        </section>
      </main>
    </>
  );
};

export default Comment;
