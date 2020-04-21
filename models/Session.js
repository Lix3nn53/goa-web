const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  refreshToken: String,
  userAgent: Object,
  geo: Object,
});

mongoose.model("session", sessionSchema);
