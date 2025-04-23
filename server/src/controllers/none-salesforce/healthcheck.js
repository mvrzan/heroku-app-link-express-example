import { getCurrentTimestamp } from "../../utils/loggingUtil.js";

const healthcheck = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🏥 - healthcheck - Healthcheck request received!`);

    console.log(`${getCurrentTimestamp()} ✅ - healthcheck - Healthcheck request was successful!`);

    res.status(200).send("OK");
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - healthcheck - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default healthcheck;
