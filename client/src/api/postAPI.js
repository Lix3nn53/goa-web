import axios from "axios";
import tokenService from "./tokenService";

const publishPost = async (title, text, author, image) => {
  const params = { title, text, author, image };

  const res = await tokenService.requestWithAccessToken(
    "/api/posts",
    "post",
    params
  );

  if (res.success === false) {
    return res;
  }

  return true;
};

const getPost = async (postId) => {
  try {
    const res = await axios.get("/api/post?postId=" + postId);

    return res.data;
  } catch (error) {
    return false;
  }
};

export default { publishPost, getPost };
