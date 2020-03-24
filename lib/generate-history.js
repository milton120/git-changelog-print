const getCommits = require("../lib/git");
const fs = require("fs");
const path = require("path");

function getfilePath(fileName) {
  return path.resolve(process.cwd(), fileName || "CHANGELOG.md");
}

function addMarkDownSyntax(commit) {
  commit.subject = "## " + commit.subject + '\n\n';
  commit.hash = commit.hash + '\n';
  commit.authorName = commit.authorName + '\n',
  commit.authorDate = commit.authorDate + '\n';
  commit.body = commit.body + '\n';
  
  return commit;
}

function convertCommitsToString(commits) {
  let markdownStr = '';
  for (let commit of commits) {
    markdownStr += commit.hash + commit.authorName + commit.authorDate + commit.subject + commit.body;
  }

  markdownStr += '\n';

  return markdownStr;
}

async function generateHistory(fileName) {
  let commits = await getCommits();
  console.log(fileName);
  commits = commits.map(addMarkDownSyntax);
  console.log(commits);

  let markdownStr = convertCommitsToString(commits);
  let filePath = getfilePath(fileName);
  return fs.writeFileSync(filePath, markdownStr);
}

module.exports = generateHistory;
