const User = require("../models/user");

async function index(req, res) {
  const users = await User.find({});
  const dailyLeaderboard = [];
  const weeklyLeaderboard = [];
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  users.forEach((user) => {
    const todayRuns = user.runs.filter(
      (run) => run.date.toISOString().split("T")[0] === todayDate
    );

    const dailyRuns = todayRuns.reduce((acc, run) => {
      return acc + run.distance;
    }, 0);

    dailyLeaderboard.push([user.username, dailyRuns]);

    const weekRuns = user.runs.filter((run) => {
      const runDate = run.date.toISOString().split("T")[0];
      return (
        new Date(runDate).getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000
      );
    });
    const weeklyRuns = weekRuns.reduce((acc, run) => {
      return acc + run.distance;
    }, 0);
    weeklyLeaderboard.push([user.username, weeklyRuns]);
  });
  const sortedDailyLeaderboard = dailyLeaderboard.sort((a, b) => b[1] - a[1]);
  const sortedWeeklyLeaderboard = weeklyLeaderboard.sort((a, b) => b[1] - a[1]);
  res.render("leaderboard/index.ejs", {
    sortedDailyLeaderboard,
    sortedWeeklyLeaderboard,
  });
}

module.exports = {
  index,
};
