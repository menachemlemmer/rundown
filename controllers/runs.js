const User = require("../models/user");
const fetch = require("node-fetch");

async function getWeather(zip, key) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${key}`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
}

async function index(req, res) {
  const currentUser = await User.findById(req.session.user._id);
  const runs = currentUser.runs;
  const sortedRuns = runs.sort((a, b) => b.date - a.date);
  const weatherData = await getWeather(
    "11209",
    process.env.OPENWEATHER_API_KEY
  );
  const avgSpeed =
    runs.reduce((acc, run) => acc + Number(run.speed), 0) / runs.length;

  const totalDistance = runs.reduce((acc, run) => acc + run.distance, 0);
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const todayRuns = runs.filter(
    (run) => run.date.toISOString().split("T")[0] === todayDate
  );
  const todayDistance = todayRuns.reduce((acc, run) => acc + run.distance, 0);
  const weeklyRuns = runs.filter((run) => {
    const runDate = run.date.toISOString().split("T")[0];
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    return (
      new Date(runDate).getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000
    );
  });

  const weeklyAvgSpeed =
    weeklyRuns.reduce((acc, run) => acc + Number(run.speed), 0) /
    weeklyRuns.length;

  const avgDailyDistance = totalDistance / runs.length;

  const goalProgress = (todayDistance / currentUser.dailyGoal) * 100;

  res.render("runs/index.ejs", {
    sortedRuns,
    weatherData,
    avgSpeed,
    totalDistance,
    weeklyAvgSpeed,
    avgDailyDistance,
    goalProgress,
  });
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
    req.body.location = 11204;
    req.body.dailyGoal = 5;
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
