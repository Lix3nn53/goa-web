const passport = require("passport");
const authHandler = require("./authHandler");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"],
      prompt: "select_account",
      session: false,
    })
  );

  app.get("/auth/google/callback", function (req, res, next) {
    passport.authenticate("google", { session: false }, async function (
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
