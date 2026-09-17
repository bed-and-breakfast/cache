import { saveRun } from "./saveImpl";

if (process.env.ACTIONS_CACHE_URL) {
  process.env.ACTIONS_RESULTS_URL = process.env.ACTIONS_CACHE_URL;
}

saveRun(true);
