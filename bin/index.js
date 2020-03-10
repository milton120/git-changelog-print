#!/usr/bin/env node
const program = require("commander");
const packageJson = require("../package.json")
const generateHistory = require('../lib/generate-history')



program
  .version(packageJson.version)
  .command("output <name>")
  .alias("o")
  .description("Output all commit history with preferred file name")
  .action((name) => {
    console.log(`hello from terminal`);
    generateHistory(name);
  });

program.parse(process.argv);
