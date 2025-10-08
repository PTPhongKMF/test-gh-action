import core from "@actions/core";

function main() {
  try {
    const token = core.getInput("token");
    const name = core.getInput("name", { required: true });

    core.info("token: " + token);
  } catch (error) {
    core.setFailed("❌ An unexpected error occurred:\n" + error);
  }
}
"test ndsdsdsdsdsdothing";
main();
