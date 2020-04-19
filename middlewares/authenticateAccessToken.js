const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

module.exports = (req, res, next) => {
  const accessToken = req.body.accessToken;

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
