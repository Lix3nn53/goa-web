const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["read:user"],
      prompt: "select_account",
      session: false,
    })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
