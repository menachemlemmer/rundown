const User = require("../models/user");
const fetch = require("node-fetch");

async function index(req, res) {
  const currentUser = await User.findById(req.session.user._id);
  const runs = currentUser.runs;
  const sortedRuns = runs.sort((a, b) => b.date - a.date);
  res.render("runs/index.ejs", { sortedRuns });
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
    const time = req.body.time.split(":");
    const distance = req.body.distance;
    const speed =
      (Number(time[0]) * 60 * 60 + Number(time[1]) * 60 + Number(time[2])) /
      60 /
      distance;
    req.body.speed = String(speed).slice(0, 4);
    currentUser.runs.push(req.body);
    await currentUser.save();
    res.redirect("/runs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    res.render("runs/show.ejs", { run });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function deleteRun(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.runs.id(req.params.runId).deleteOne();
    await currentUser.save();
    res.redirect("/runs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function edit(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    const date = run.date.toISOString().slice(0, -1);
    res.render("runs/edit.ejs", { run, date });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function update(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    const time = req.body.time.split(":");
    const distance = req.body.distance;
    const speed =
      (Number(time[0]) * 60 * 60 + Number(time[1]) * 60 + Number(time[2])) /
      60 /
      distance;
    req.body.speed = String(speed).slice(0, 4);
    run.set(req.body);
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
  show,
  delete: deleteRun,
  edit,
  update,
};
