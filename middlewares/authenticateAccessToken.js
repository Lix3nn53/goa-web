const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken == null) return res.sendStatus(401);

  const remoteAddress = req.ip;

  jwt.verify(
    accessToken,
    keys.accessTokenSecret,
    { subject: remoteAddress },
    (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
};
