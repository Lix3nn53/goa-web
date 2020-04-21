const passport = require("passport");
const authHandler = require("./authHandler");

module.exports = (app) => {
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { session: false })
  );

  app.get("/auth/facebook/callback", function (req, res, next) {
    passport.authenticate("facebook", { session: false }, async function (
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400);
      }

      await authHandler.successfulLogin(req, res, user);
    })(req, res, next);
  });
};
