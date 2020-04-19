const mongoose = require("mongoose");
const authenticateAccessToken = require("../middlewares/authenticateAccessToken");
const requireAdmin = require("../middlewares/requireAdmin");
const paginateResults = require("../middlewares/paginateResults");

const User = mongoose.model("users");
const Post = mongoose.model("posts");

module.exports = (app) => {
  app.get("/api/posts", paginateResults(Post), async (req, res) => {
    res.json(res.paginatedResults);
  });

  app.post(
    "/api/posts",
    authenticateAccessToken,
    requireAdmin(User),
    async (req, res) => {
      const body = req.body;

      const post = new Post({
        title: body.title,
        text: body.text,
        author: body.author,
        image: body.image,
        dateSent: Date.now(),
      });

      try {
        await post.save();
        res.send({});
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  );

  app.get("/api/post", async (req, res) => {
    const postId = req.query.postId;

    if (postId) {
      const result = await Post.findById(postId);

      res.send(result);
      return;
    }

    res.send({});
  });
};
