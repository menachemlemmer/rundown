const User = require("../models/user");

async function index(req, res) {
  const users = await User.find({});
  const dailyLeaderboard = {};
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  users.forEach((user) => {
    const todayRuns = user.runs.filter(
      (run) => run.date.toISOString().split("T")[0] === todayDate
    );
    dailyLeaderboard[user.username] = todayRuns.reduce((acc, run) => {
      return acc + run.distance;
    }, 0);
  });
  res.render("leaderboard/index.ejs", { dailyLeaderboard });
}

module.exports = {
  index,
};
