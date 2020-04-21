const passport = require("passport");

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
