const axios = require("axios");
const mongoose = require("mongoose");
const authHandler = require("./authHandler");
const keys = require("../../config/keys");

const User = mongoose.model("users");

const tokenURL = "https://oauth2.googleapis.com/token";
const userProfileURL = "https://www.googleapis.com/oauth2/v2/userinfo";

module.exports = (app) => {
  app.get("/auth/google", async function (req, res, next) {
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

    const token_res = await getToken(res, code);

    if (!token_res) {
      return;
    }

    const { access_token, expires_in, scope, token_type, id_token } = token_res;

    const profile_res = await getUserProfile(res, access_token);

    if (!profile_res) {
      return;
    }

    const {
      id,
      email,
      verified_email,
      name,
      given_name,
      family_name,
      picture,
      locale,
    } = profile_res;

    let user = await User.findOne({ googleId: id }, "+sessions");

    if (!user) {
      user = await new User({
        googleId: id,
        username: given_name,
        verified: true,
      }).save(); //we already have a record with given profile.id
    }

    console.log(user);

    await authHandler.successfulLogin(req, res, user);
  });
};

const getToken = async (res, code) => {
  try {
    const res = await axios.post(tokenURL, {
      code,
      client_id: keys.googleClientID,
      client_secret: keys.googleClientSecret,
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
    });

    return res.data;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }

  return false;
};

const getUserProfile = async (res, access_token) => {
  try {
    const res = await axios.get(userProfileURL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }

  return false;
};
