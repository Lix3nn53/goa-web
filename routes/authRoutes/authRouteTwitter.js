const passport = require("passport");
const authHandler = require("./authHandler");

module.exports = (app) => {
  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", {
      scope: ["user"],
      prompt: "select_account",
      session: false,
    })
  );

  app.get("/auth/twitter/callback", function (req, res, next) {
    passport.authenticate("twitter", { session: false }, async function (
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
