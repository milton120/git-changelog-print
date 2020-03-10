const getCommits = require("../lib/git");

async function generateHistory(fileName) {
  const commits = await getCommits();
  console.log(fileName);
  console.log(commits);
}

module.exports = generateHistory;
