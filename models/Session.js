const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  refreshToken: { type: String, select: false, required: true },
  userAgent: Object,
  geo: Object,
  lastActive: Date,
});

mongoose.model("session", sessionSchema);
