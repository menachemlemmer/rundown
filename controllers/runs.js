const User = require("../models/user");

function index(req, res) {
  res.render("runs/index.ejs");
}

module.exports = { index };
