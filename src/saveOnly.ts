import { saveOnlyRun } from "./saveImpl";
import * as https from "https";
import { URL } from "url";

if (process.env.ACTIONS_CACHE_URL) {
  process.env.ACTIONS_RESULTS_URL = process.env.ACTIONS_CACHE_URL;
}

function debugProbe(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const base = new URL(process.env.ACTIONS_RESULTS_URL || "");
      const target = new URL(
        "/twirp/github.actions.results.api.v1.CacheService/CreateCacheEntry",
        base
      );
      const body = JSON.stringify({});
      const req = https.request(
        {
          hostname: target.hostname,
          port: target.port || 443,
          path: target.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
            Authorization: `Bearer ${process.env.ACTIONS_RUNTIME_TOKEN}`,
          },
        },
        (res) => {
          console.log(`::notice::DEBUG_PROBE status=${res.statusCode}`);
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => {
            console.log(
              `::notice::DEBUG_PROBE body=${JSON.stringify(data.slice(0, 500))}`
            );
            resolve();
          });
        }
      );
      req.on("error", (e) => {
        console.log(`::notice::DEBUG_PROBE error=${e}`);
        resolve();
      });
      req.write(body);
      req.end();
    } catch (e) {
      console.log(`::notice::DEBUG_PROBE threw=${e}`);
      resolve();
    }
  });
}

debugProbe().then(() => saveOnlyRun(true));
