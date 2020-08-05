const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.generateToken = (id, tokenType) => {
  if (!(tokenType === "accessToken" || tokenType === "refreshToken"))
    return null;

  var secret = keys.accessTokenSecret;
  var expireTime = "15s";

  if (tokenType === "refreshToken") {
    secret = keys.refreshTokenSecret;
    expireTime = "1y";
  }

  //Use JWT for access tokens
  const token = jwt.sign(
    {
      user: id,
    },
    secret,
    {
      expiresIn: expireTime,
    }
  );

  return token;
};
