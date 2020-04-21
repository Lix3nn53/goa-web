const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const generateToken = (user, tokenType, remoteAddress) => {
  if (!(tokenType === "accessToken" || tokenType === "refreshToken"))
    return null;

  const secret = keys.accessTokenSecret;
  const expireTime = "1m";

  if (tokenType === "refreshToken") {
    secret = keys.refreshTokenSecret;
    expireTime = "1y";
  }

  //Use JWT for access tokens
  var token = jwt.sign(
    {
      user: user,
    },
    secret,
    {
      expiresIn: expireTime,
      subject: remoteAddress,
    }
  );

  return token;
};

exports.generateToken = generateToken;
