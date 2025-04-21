import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const getLimits = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - getLimits - Request received...`);

    const { context } = req.sdk;
    const accessToken = context?.org?.accessToken;
    const domainUrl = context?.org?.domainUrl;

    console.log(`${getCurrentTimestamp()} 👀 - getLimits - Fetching Data Cloud limits...`);

    const response = await fetch(`${domainUrl}/services/data/v63.0/limits`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to get Data Cloud limit information: ${response.status} - ${response.statusText}`
      );
    }

    console.log(`${getCurrentTimestamp()} ✅ - getLimits - Data Cloud limit information successfully provided!`);

    res.status(200).send({
      message: "Data Cloud Limits",
      limits: data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getLimits - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default getLimits;
