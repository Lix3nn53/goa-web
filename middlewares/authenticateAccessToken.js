const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null)
    return res.status(401).json({ errorMessage: "Not Authenticated" });

  jwt.verify(accessToken, keys.accessTokenSecret, (err, decodedToken) => {
    if (err) return res.status(403).json({ errorMessage: "Not Authenticated" });

    const userId = decodedToken.user;

    User.findById(userId, async function (err, user) {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      if (!user)
        return res.status(403).json({ errorMessage: "Not Authenticated" });

      req.user = user;

      next();
    });
  });
};
