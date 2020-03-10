const execa = require("execa");
const COMMIT_SEPARATOR = "COMMIT_SEPARATOR";
const OPTION_SEPARATOR = "OPTION_SEPARATOR";

const prettyFormat = {
  hash: "%H",
  authorName: "%an",
  authorEmail: "%ae",
  authorDate: "%aD",
  committerName: "%cn",
  committerEmail: "%ce",
  committerDate: "%cD",
  subject: "%s",
  body: "%b"
};

class Commit {
  constructor(
    hash,
    authorName,
    authorEmail,
    authorDate,
    committerName,
    committerEmail,
    committerDate,
    subject,
    body
  ) {
    this.hash = hash;
    this.authorName = authorName;
    this.authorEmail = authorEmail;
    this.authorDate = authorDate;
    this.committerName = committerName;
    this.committerEmail = committerEmail;
    this.committerDate = committerDate;
    this.subject = subject;
    this.body = body;
  }
}

function getLogOptions() {
  let logOptions = "--pretty=format:";
  for ([key, value] of Object.entries(prettyFormat)) {
    logOptions += value;
    logOptions += OPTION_SEPARATOR;
  }
  logOptions += COMMIT_SEPARATOR;

  return logOptions;
}

function normalizeCommit(commitStr) {
  const commits = [];
  const commitStrArray = commitStr.split(COMMIT_SEPARATOR);
  commitStrArray.pop();

  for (let commit of commitStrArray) {
    const commitData = commit.split(OPTION_SEPARATOR);
    const commitObj = new Commit(...commitData);
    commits.push(commitObj);
  }

  return commits;
}

async function getCommits() {
  const logOptions = getLogOptions();
  const { stdout } = await execa("git", ["log", logOptions]);
  const commits = normalizeCommit(stdout);
  return commits;
}

module.exports = getCommits;
