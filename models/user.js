const mongoose = require("mongoose");

const runSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  runs: [runSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
