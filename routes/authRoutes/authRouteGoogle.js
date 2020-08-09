const axios = require("axios");
const mongoose = require("mongoose");
const authHandler = require("./authHandler");
const keys = require("../../config/keys");

const User = mongoose.model("users");

const tokenURL = "https://oauth2.googleapis.com/token";
const userProfileURL = "https://www.googleapis.com/oauth2/v2/userinfo";

module.exports = (app) => {
  app.get("/auth/google", async function (req, res, next) {
    const code = authHandler.getOauthCode(req);

    var access_token;

    try {
      const accessTokenRes = await axios.post(tokenURL, {
        code,
        client_id: keys.googleClientID,
        client_secret: keys.googleClientSecret,
        redirect_uri: "http://localhost:3000/auth/google",
        grant_type: "authorization_code",
      });

      access_token = accessTokenRes.data.access_token;
    } catch (err) {
      console.log("google token err", err);
      res.status(500).json({
        err: "Error while trying to get access token",
      });
    }

    var id;
    var username;

    try {
      const userInfoRes = await axios.get(userProfileURL, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const profile = userInfoRes.data;

      console.log("profile");
      console.log(profile);

      id = profile.id;
      username = profile.name;
    } catch (err) {
      console.log("google user info err", err);
      res.status(500).json({
        err: "Error while trying to get user info",
      });
    }

    var user;

    try {
      user = await User.findOne({ googleId: id }, "+sessions");

      if (!user) {
        user = await new User({
          googleId: id,
          username: name,
          verified: true,
        }).save();
      }
    } catch (err) {
      console.log("google database err", err);
      res.status(500).json({
        err: "Database error",
      });
    }

    authHandler.successfulLogin(req, res, user);
  });
};
