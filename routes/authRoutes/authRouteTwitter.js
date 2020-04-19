const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", {
      scope: ["user"],
      prompt: "select_account",
      session: false,
    })
  );

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { session: false }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
