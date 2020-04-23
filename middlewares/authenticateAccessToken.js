const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null) return res.sendStatus(401);

  const remoteAddress = req.ip;

  jwt.verify(accessToken, keys.accessTokenSecret, (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    const userId = decodedToken.user;

    User.findById(userId, async function (err, user) {
      if (err) return res.sendStatus(403);
      if (!user) return res.sendStatus(403);

      req.user = user;

      next();
    });
  });
};
