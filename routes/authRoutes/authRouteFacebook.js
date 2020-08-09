const axios = require("axios");
const mongoose = require("mongoose");
const authHandler = require("./authHandler");
const keys = require("../../config/keys");

const User = mongoose.model("users");

const tokenURL = "https://graph.facebook.com/v8.0/oauth/access_token";
const userProfileURL = "https://graph.facebook.com/me?fields=id,name,email";

module.exports = (app) => {
  app.get("/auth/facebook", async function (req, res, next) {
    const code = authHandler.getOauthCode(req);

    var access_token;

    try {
      const accessTokenRes = await axios.get(
        tokenURL +
          "?client_id=" +
          keys.facebookAppID +
          "&redirect_uri=" +
          "http://localhost:3000/auth/facebook" +
          "&client_secret=" +
          keys.facebookAppSecret +
          "&code=" +
          code
      );

      access_token = accessTokenRes.data.access_token;
    } catch (err) {
      console.log("facebook token err", err);
      res.status(500).json({
        err: "Error while trying to get access token",
      });
    }

    var id;
    var username;

    try {
      const userInfoRes = await axios.get(
        userProfileURL + "&access_token=" + access_token
      );

      const profile = userInfoRes.data;

      console.log("profile");
      console.log(profile);

      id = profile.id;
      username = profile.name;
    } catch (err) {
      console.log("facebook user info err", err);
      res.status(500).json({
        err: "Error while trying to get user info",
      });
    }

    var user;

    try {
      user = await User.findOne({ facebookId: id }, "+sessions");

      if (!user) {
        user = await new User({
          facebookId: id,
          username: name,
          verified: true,
        }).save();
      }
    } catch (err) {
      console.log("facebook database err", err);
      res.status(500).json({
        err: "Database error",
      });
    }

    authHandler.successfulLogin(req, res, user);
  });
};
