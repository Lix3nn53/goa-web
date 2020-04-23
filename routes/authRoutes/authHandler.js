const mongoose = require("mongoose");
const parser = require("ua-parser-js");
const geoip = require("geoip-lite");
const token = require("../../services/token");

const Session = mongoose.model("session");

const successfulLogin = async (req, res, user) => {
  const remoteAddress = req.ip;
  var ua = parser(req.headers["user-agent"]);
  var geo = geoip.lookup(remoteAddress);

  const id = user._id;
  const refreshToken = token.generateToken(id, "refreshToken");
  const accessToken = token.generateToken(id, "accessToken");

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
