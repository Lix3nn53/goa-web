const _ = require("lodash");
const mongoose = require("mongoose");
const authenticateAccessToken = require("../middlewares/authenticateAccessToken");

const User = mongoose.model("users");

const {
  passwordRegex,
  emailRegex,
  usernameRegex,
  minecraftUsernameRegex,
} = require("../services/regex");

module.exports = (app) => {
  app.post("/api/profile", authenticateAccessToken, async (req, res) => {
    const {
      email,
      username,
      password,
      identityNumber,
      registrationAddress,
      city,
      country,
      minecraftUsername,
    } = req.body;

    if (username) {
      if (username != req.user.username) {
        if (!usernameRegex.test(username)) {
          return res.status(400).json({
            success: false,
            message: "Invalid request.",
          });
        } else {
          const user = await User.findOne({
            username: username,
          });

          if (user) {
            return res.status(400).json({
              success: false,
              message: "Username is taken.",
            });
          }
        }
      }
    }

    if (password) {
      if (password != req.user.password) {
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            success: false,
            message: "Invalid request.",
          });
        }
      }
    }

    if (minecraftUsername) {
      if (minecraftUsername != req.user.minecraftUsername) {
        if (!minecraftUsernameRegex.test(minecraftUsername)) {
          return res.status(400).json({
            success: false,
            message: "Invalid request.",
          });
        }
      }
    }

    const billing = {
      identityNumber: identityNumber,
      registrationAddress: registrationAddress,
      city: city,
      country: country,
    };

    clean(billing);

    var profife = {
      email: email,
      username: username,
      password: password,
      billing: billing,
      minecraftUsername: minecraftUsername,
    };

    clean(profife);

    if (email) {
      if (email != req.user.email) {
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: "Invalid request.",
          });
        } else {
          const user = await User.findOne({
            email: email,
          });

          if (user) {
            return res.status(400).json({
              success: false,
              message: "Email is taken.",
            });
          }
        }
      }
    }

    try {
      const mongoRes = await User.findOneAndUpdate(
        { _id: req.user.id },
        profife,
        {
          new: true, //return new document
        }
      );

      res.send(mongoRes);
    } catch (err) {
      res.send(err);
    }
  });
};

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    } else if (
      typeof obj[propName] === "object" &&
      Object.keys(obj[propName]).length === 0
    ) {
      delete obj[propName];
    }
  }
}
