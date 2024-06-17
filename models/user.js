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
  speed: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  password: {
    type: String,
    minLength: 3,
    required: true,
  },
  location: {
    type: Number,
    length: 5,
  },
  dailyGoal: {
    type: Number,
  },
  runs: [runSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
