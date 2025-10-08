import core from "@actions/core";
import process from "node:process";

function main() {
  try {
    const token = core.getInput("token");
    const name = core.getInput("name", { required: true });

    core.info("token: " + (token ?? process.env.GITHUB_TOKEN));
  } catch (error) {
    core.setFailed("❌ An unexpected error occurred:\n" + error);
  }
}

main();
