const keys = require("../config/keys");
const authenticateAccessToken = require("../../middlewares/authenticateAccessToken");

module.exports = app => {
  app.get("/api/logout", authenticateAccessToken, (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken) {
      //remove refresh token
      const index = req.user.refreshTokens.indexOf(refreshToken);
      if (index >= 0) req.user.refreshTokens.splice(index, 1);
    }

    await req.user.save();

    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", authenticateAccessToken, (req, res) => {
    res.send(req.user);
  });

  app.post('/refreshAccessToken', authenticateAccessToken, (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401)

    const user = req.user;
    if (!user.refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403)

      const includes = user.refreshTokens.includes(refreshToken);
      if (!includes) return res.sendStatus(403);

      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
};
