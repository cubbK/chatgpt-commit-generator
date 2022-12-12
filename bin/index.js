#! /usr/bin/env node
const { exec } = require("child_process");

exec("git diff --cached", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  const diff = stdout;

  if (diff.length === 0) {
    console.log("forgot to stage files? The diff is empty");
    return;
  }

  if (diff.length < 5000) {
    const question =
      `Suggest me a few good commit messages for my commit.\n` +
      "```\n" +
      diff +
      "\n" +
      "```\n\n" +
      `Output results as a list, not more than 6 items.`;

    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(question);
    proc.stdin.end();
    console.log(
      "Copied the question to clipboard 🦄. Paste this question to https://chat.openai.com/chat to get the commit message"
    );
    return;
  }

  exec("git status", (error1, stdout1, stderr1) => {
    const diffShort = stdout1;
    const question =
      `Suggest me a few good commit messages for my commit.\n` +
      "```\n" +
      diffShort +
      "\n" +
      "```\n\n" +
      `Output results as a list, not more than 6 items.`;

    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(question);
    proc.stdin.end();
    console.log(
      "Copied the question to clipboard 🦄. Paste this question to https://chat.openai.com/chat to get the commit message"
    );
    return;
  });
});
