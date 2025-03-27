import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const healthcheck = (req, res) => {
  console.log(`${getCurrentTimestamp()} 🏥 - healthcheck - Healthcheck request received!`);
  console.log("request", req);
  console.log("response", res);

  res.status(200).send("OK");
};

export default healthcheck;
