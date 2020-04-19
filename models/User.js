const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;
const BillingSchema = require("./Billing");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  googleId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    select: false,
  },
  githubId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    select: false,
  },
  twitterId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    select: false,
  },
  facebookId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    select: false,
  },
  email: { type: String, index: true, unique: true, sparse: true },
  username: String,
  password: { type: String, select: false },
  credits: { type: Number, default: 0 },
  billing: BillingSchema,
  role: { type: String, default: "user" },
  minecraftUsername: String,
  verified: Boolean,
  refreshTokens: { type: [String], select: false },
});

userSchema.methods.verifyPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

mongoose.model("users", userSchema);
