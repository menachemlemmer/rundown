const User = require("../models/user");

async function index(req, res) {
  res.render("runs/index.ejs");
}

async function newPage(req, res) {
  try {
    res.render("runs/new.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function create(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.runs.push(req.body);
    await currentUser.save();
    res.redirect("/runs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  index,
  new: newPage,
  create,
};
