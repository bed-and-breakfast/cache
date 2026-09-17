import { restoreOnlyRun } from "./restoreImpl";

if (process.env.ACTIONS_CACHE_URL) {
  process.env.ACTIONS_RESULTS_URL = process.env.ACTIONS_CACHE_URL;
}

restoreOnlyRun(true);
