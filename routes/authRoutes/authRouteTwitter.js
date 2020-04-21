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

      const remoteAddress = req.ip;

      const refreshToken = token.generateToken(
        user,
        "refreshToken",
        remoteAddress
      );
      const accessToken = token.generateToken(
        user,
        "accessToken",
        remoteAddress
      );

      user.refreshTokens.push(refreshToken);

      await user.save();

      return res.status(200).json({
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
    })(req, res, next);
  });
};
