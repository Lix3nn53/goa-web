const passport = require("passport");

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
    passport.authenticate("google", { session: false }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          success: false,
        });
      }

      const remoteAddress = req.ip;

      const refreshToken = token.generateToken(user, "refreshToken", remoteAddress);
      const accessToken = token.generateToken(user, "accessToken", remoteAddress);

      user.refreshTokens.push(refreshToken);

      await user.save();

      return res.status(200).json({
        success: true,
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
    })(req, res, next);
  });
};
