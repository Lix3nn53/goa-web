import axios from "axios";

const publishPost = async (title, text, author, image) => {
  try {
    await axios.post("/api/posts", { title, text, author, image });

    return true;
  } catch (error) {
    return false;
  }
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
