const passport = require("passport");
const authHandler = require("./authHandler");

module.exports = (app) => {
  app.get("/auth/google", function (req, res, next) {
    passport.authenticate("google-token", { session: false }, async function (
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400);
      }
      console.log(user);

      await authHandler.successfulLogin(req, res, user);
    })(req, res, next);
  });
};
