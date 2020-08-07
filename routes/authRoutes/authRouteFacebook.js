const passport = require("passport");
const authHandler = require("./authHandler");
const axios = require("axios");
const keys = require("../../config/keys");

module.exports = (app) => {
  app.get("/auth/facebook", async function (req, res, next) {
    var code;
    var state;
    if (req.query && req.query.code) {
      code = req.query.code;
      state = req.query.state;
    }

    console.log("facebook start");

    try {
      const accessTokenRes = await axios.get("https://graph.facebook.com/v8.0/oauth/access_token"
      + "?client_id=" + keys.facebookAppID
      + "&redirect_uri="  +"http://localhost:3000/auth/facebook"
      + "&client_secret=" + keys.facebookAppSecret 
      + "&code=" + code);

      const { access_token } = accessTokenRes.data;

      console.log("facebook access_token");
      console.log(access_token);

      const userInfoRes = await axios.get("https://graph.facebook.com/me?fields=id,name,email"
      + "&access_token=" + access_token);

      const profile_res = userInfoRes.data;

      console.log("profile_res");
      console.log(profile_res);

      const {
        id,
        email,
        name,
      } = profile_res;

      let user = await User.findOne({ facebookId: id }, "+sessions");

    if (!user) {
      user = await new User({
        facebookId: id,
        username: name,
        email,
        verified: true,
      }).save();
    }

    await authHandler.successfulLogin(req, res, user);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  });
};
