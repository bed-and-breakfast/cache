import { restoreRun } from "./restoreImpl";

if (process.env.GHA_SELF_HOSTED_CACHE_URL) {
  process.env.ACTIONS_RESULTS_URL = process.env.GHA_SELF_HOSTED_CACHE_URL;
}

restoreRun(true);
