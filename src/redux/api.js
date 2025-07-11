const baseUrl = "https://blogpost-backend-c59e.onrender.com";

const userUrl = `${baseUrl}/user`;
const postUrl = `${baseUrl}/post`;
const commentUrl = `${baseUrl}/comment`;
const likeUrl = `${baseUrl}/like`;

export const registerUser = `${userUrl}/register`;

export const loginUser = `${userUrl}/login`;
export const logout = `${userUrl}/logout`;
export const userListApi = `${userUrl}/userlist`;
export const updateImageApi = `${userUrl}/update-image`;
export const getMyProfileApi = `${userUrl}/me`;

export const createPostApi = `${postUrl}/new`;
export const updatePostApi = `${postUrl}`;
export const deletePostApi = `${postUrl}`;
export const allPost = `${postUrl}`;

// comment apis

export const newCommentApi = `${commentUrl}/new`;
export const allCommentApi = `${commentUrl}/all-comment`;
export const deleteCommentApi = `${commentUrl}`;

// like route;

export const likePostApi = `${likeUrl}/new`;
export const likeListApi = `${likeUrl}`;
export const unLikePostApi = `${likeUrl}/delete`;
