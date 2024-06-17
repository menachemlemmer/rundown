const user = require("../models/user");

function index(req, res) {
  res.render("settings/index.ejs");
}

async function create(req, res) {
  try {
    const currentUser = await user.findById(req.session.user._id);
    currentUser.settings.push(req.body);
    await currentUser.save();
    res.redirect("/runs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  index,
  create,
};
