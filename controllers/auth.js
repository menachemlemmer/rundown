const bcrypt = require("bcrypt");

const User = require("../models/user.js");

function getSignUp(req, res) {
  const error = req.flash("error");
  res.render("auth/sign-up.ejs", { error });
}

function getSignIn(req, res) {
  const error = req.flash("error");
  res.render("auth/sign-in.ejs", { error });
}

function signOut(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

async function signUp(req, res) {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      req.flash("error", "Username already exists. Please try again.");
      return res.redirect("/auth/sign-up");
    }

    if (req.body.password !== req.body.confirmPassword) {
      req.flash("error", "Passwords do not match. Please try again.");
      return res.redirect("/auth/sign-up");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    req.session.user = {
      username: user.username,
      _id: user._id,
    };

    console.log(req.session.user);

    req.session.save(() => {
      res.redirect("/runs");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function signIn(req, res) {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      req.flash("error", "Login failed. Please try again.");
      return res.redirect("/auth/sign-in");
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      req.flash("error", "Login failed. Please try again.");
      return res.redirect("/auth/sign-in");
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    req.session.save(() => {
      res.redirect("/runs");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  getSignUp,
  getSignIn,
  signOut,
  signUp,
  signIn,
};
