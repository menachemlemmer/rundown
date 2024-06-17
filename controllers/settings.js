const User = require("../models/user");
const user = require("../models/user");
const runCtrl = require("../controllers/runs");

async function index(req, res) {
  const currentUser = await User.findById(req.session.user._id);
  const location = currentUser.location;
  const dailyGoal = currentUser.dailyGoal;
  const error = req.flash("error");
  res.render("settings/index.ejs", { location, dailyGoal, error });
}

async function update(req, res) {
  try {
    const currentUser = await user.findById(req.session.user._id);
    if (req.body.location) {
      const weather = await runCtrl.getWeather(
        req.body.location,
        process.env.OPENWEATHER_API_KEY
      );
      if (weather.cod === "400" || weather.cod === "404") {
        req.flash("error", "Invalid location. Please try again.");
        console.log("Invalid location");
        return res.redirect("/settings");
      }
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
