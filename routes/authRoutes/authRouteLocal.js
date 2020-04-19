const passport = require("passport");
const mongoose = require("mongoose");
const SendgridSingle = require("../../services/mailers/SendgridSingle");
const registerTemplate = require("../../services/emailTemplates/registerTemplate");
const { Path } = require("path-parser");
const bcrypt = require("bcryptjs");
const token = require("../../services/token");

const User = mongoose.model("users");
const UserVerify = mongoose.model("usersVerify");

const {
  passwordRegex,
  emailRegex,
  usernameRegex,
} = require("../../services/regex");

module.exports = (app) => {
  app.post("/auth/local", function (req, res, next) {
    passport.authenticate("local", { session: false }, function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) {
          return next(err);
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
      });
    })(req, res, next);
  });

  app.post("/auth/local/register", async (req, res) => {
    const { email, username, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match.",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password is not valid.",
      });
    }

    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Username is not valid.",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is not valid.",
      });
    }

    var user;

    try {
      user = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });
    } catch (error) {
      return done(error);
    }

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email or username is taken.",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await new User({
        email: email,
        username: username,
        password: hashedPassword,
        verified: false,
      }).save();

      req.logIn(user, { session: false }, async function (err) {
        if (err) {
          return next(err);
        }

        const userVerify = await new UserVerify({
          _user: user.id,
        }).save();

        const mailer = new SendgridSingle(
          { subject: "Activate your GoA account", recipient: email },
          registerTemplate(userVerify)
        );

        mailer.send();

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
      });
    } catch (error) {
      return done(error);
    }
  });

  app.get("/auth/local/verify/:verifyID", async (req, res) => {
    const p = new Path("/auth/local/verify/:verifyID");
    const match = p.test(req.path);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
    }

    const verifyID = match.verifyID;

    const userVerify = await UserVerify.findById(verifyID);

    if (!userVerify) {
      return res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
    }

    const userId = userVerify._user;

    const user = await User.findById(userId);

    user.verified = true;

    await user.save();

    await userVerify.remove();

    res.redirect("/register/verify");
  });

  app.get("/auth/local/register/resend", async (req, res) => {
    if (req.user) {
      const user = req.user;
      if (user.verified) {
        return res.status(400).json({
          success: false,
          message: "User is already verified.",
        });
      }

      const userVerify = await UserVerify.findOne({
        _user: user.id,
      });

      const mailer = new SendgridSingle(
        { subject: "Activate your GoA account", recipient: user.email },
        registerTemplate(userVerify)
      );

      try {
        await mailer.send();
      } catch (err) {
        res.status(422).send(err);
      }

      return res.status(200).json({
        success: true,
      });
    }
  });
};
