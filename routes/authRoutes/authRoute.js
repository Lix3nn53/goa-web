const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../../config/keys");
const token = require("../../services/token");

const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/logout", (req, res) => {
    req.logout();

    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        //remove refresh token that is equal to the one in header
        const filtered = user.sessions.filter(
          (session) => session.refreshToken !== refreshToken
        );
        user.sessions = filtered;

        await user.save();

        res.sendStatus(200);
      });
    });
  });

  app.get("/api/logoutAllButThis", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        const found = user.sessions.find(
          (session) => session.refreshToken === refreshToken
        );
        if (!found)
          return res.status(403).json({ errorMessage: "Not Authenticated" }); //refresh token is not valid for user

        found.lastActive = Date.now();
        user.sessions = [found];
        await user.save();

        res.send(found);
      });
    });
  });

  app.get("/api/session", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        const found = user.sessions.find(
          (session) => session.refreshToken === refreshToken
        );
        if (!found)
          return res.status(403).json({ errorMessage: "Not Authenticated" }); //refresh token is not valid for user

        found.lastActive = Date.now();
        await user.save();

        res.send(found);
      });
    });
  });

  app.get("/api/sessions", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        const found = user.sessions.find(
          (session) => session.refreshToken === refreshToken
        );
        if (!found)
          return res.status(403).json({ errorMessage: "Not Authenticated" }); //refresh token is not valid for user

        found.lastActive = Date.now();
        await user.save();

        const filtered = user.sessions.filter(
          (session) => session.refreshToken !== refreshToken
        );

        res.json({ current: found, other: filtered });
      });
    });
  });

  app.get("/api/refreshAccessToken", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        const found = user.sessions.find(
          (session) => session.refreshToken === refreshToken
        );
        if (!found)
          return res.status(403).json({ errorMessage: "Not Authenticated" }); //refresh token is not valid for user

        found.lastActive = Date.now();
        await user.save();

        const id = user._id;
        const accessToken = token.generateToken(id, "accessToken");
        res.json({ accessToken: accessToken });
      });
    });
  });

  app.get("/api/current_user", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null)
      return res.status(401).json({ errorMessage: "Not Authenticated" });

    jwt.verify(refreshToken, keys.refreshTokenSecret, (err, decodedToken) => {
      if (err)
        return res.status(403).json({ errorMessage: "Not Authenticated" });
      console.log(decodedToken);
      const userId = decodedToken.user;

      User.findById(userId, "+sessions", async (err, user) => {
        if (err)
          return res.status(403).json({ errorMessage: "Not Authenticated" });
        if (!user)
          return res.status(403).json({ errorMessage: "Not Authenticated" });

        const found = user.sessions.find(
          (session) => session.refreshToken === refreshToken
        );
        if (!found)
          return res.status(403).json({ errorMessage: "Not Authenticated" }); //refresh token is not valid for user

        found.lastActive = Date.now();
        await user.save();

        let tempUser = user.toObject();
        delete tempUser.sessions;

        console.log(tempUser);

        res.send(tempUser);
      });
    });
  });
};
