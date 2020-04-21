const keys = require("../../config/keys");
const authenticateAccessToken = require("../../middlewares/authenticateAccessToken");

module.exports = (app) => {
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");

    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null) return;

    jwt.verify(refreshToken, keys.refreshTokenSecret, async (err, user) => {
      if (err) return;

      //remove refresh token
      const filtered = user.sessions.filter(
        (session) => session.refreshToken !== refreshToken
      );
      user.sessions = filtered;

      await req.user.save();
    });
  });

  app.get("/api/logoutAllButThese", authenticateAccessToken, (req, res) => {
    res.send(req.user);
  });

  app.post("/refreshAccessToken", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403);

      const includes = user.refreshTokens.includes(refreshToken);
      if (!includes) return res.sendStatus(403); //refresh token is not valid for user

      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
  });
};
