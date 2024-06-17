const User = require("../models/user");
const user = require("../models/user");

async function index(req, res) {
  const currentUser = await User.findById(req.session.user._id);
  const location = currentUser.location;
  const dailyGoal = currentUser.dailyGoal;
  res.render("settings/index.ejs", { location, dailyGoal });
}

async function update(req, res) {
  try {
    const currentUser = await user.findById(req.session.user._id);
    console.log(req.body);
    if (req.body.location) {
      currentUser.location = req.body.location;
    }
    if (req.body.dailyGoal) {
      currentUser.dailyGoal = req.body.dailyGoal;
    }
    await currentUser.save();
    res.redirect("/runs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  index,
  update,
};
