const mongoose = require("mongoose");
const parser = require("ua-parser-js");
const geoip = require("geoip-lite");
const token = require("../../services/token");

const Session = mongoose.model("session");

exports.successfulLogin = async (req, res, user) => {
  try {
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
  } catch (err) {
    console.log("successfulLogin err", err);
    return res.status(500).json({
      err: "successfulLogin err",
    });
  }
};

exports.getOauthCode = (req) => {
  var code;
  if (req.body && req.body.code) {
    code = req.body.code;
  } else if (req.query && req.query.code) {
    code = req.query.code;
  } else if (req.headers && req.headers.code) {
    code = req.headers.code;
  } else {
    const authHeader = req.headers["authorization"];
    code = authHeader && authHeader.split(" ")[1];
  }

  return code;
};
