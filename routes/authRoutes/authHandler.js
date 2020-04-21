const parser = require("ua-parser-js");
const geoip = require("geoip-lite");
const token = require("../../services/token");

const successfulLogin = async (req, res, user) => {
  const remoteAddress = req.ip;

  const refreshToken = token.generateToken(user, "refreshToken", remoteAddress);
  const accessToken = token.generateToken(user, "accessToken", remoteAddress);

  var ua = parser(req.headers["user-agent"]);
  console.log(ua);
  console.log(remoteAddress);
  var geo = geoip.lookup(remoteAddress);
  console.log(geo);
  const session = new Session({
    refreshToken: refreshToken,
    userAgent: ua,
    geo: geo,
  });
  user.sessions.push(session);
  await user.save();

  return res.status(200).json({
    refreshToken: refreshToken,
    accessToken: accessToken,
  });
};

exports.successfulLogin = successfulLogin;
