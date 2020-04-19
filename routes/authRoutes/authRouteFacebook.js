const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { session: false })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
