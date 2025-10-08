import * as core from "@actions/core";
import * as github from "@actions/github";

async function main() {
  try {
    const token = core.getInput("token");
    const name = core.getInput("name", { required: true });

    if (!token) {
      core.setFailed("❌ No GitHub token provided.");
      return;
    } else {
      core.info(token);
    }

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info(`👤 Using name: ${name}`);
    core.info(`🏷️ Repo: ${owner}/${repo}`);

    // Create a test branch name dsds
    const branchName = `test/pr-${Date.now()}`;

    // Get the latest commit SHA from main
    const { data: mainRef } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: "heads/main",
    });

    const mainSha = mainRef.object.sha;
    core.info(`🌿 main@${mainSha}`);

    // Create new branch from main
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: mainSha,
    });
    core.info(`✅ Created branch ${branchName}`);

    // Create a new test PR
    const { data: pr } = await octokit.rest.pulls.create({
      owner,
      repo,
      head: branchName,
      base: "main",
      title: `Test PR from ${name}`,
      body: `This is a permission test PR created by GitHub Action at ${
        new Date().toISOString()
      }.`,
    });

    core.info(`🎉 Created PR #${pr.number}: ${pr.html_url}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed("❌ " + error.message);
    } else {
      core.setFailed("❌ Unknown error");
    }
  }
}

main();
