import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const getActivationTargets = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🪬 - getActivationTargets - Request received...`);

    const { context } = req.sdk;
    const accessToken = context?.org?.accessToken;
    const domainUrl = context?.org?.domainUrl;

    console.log(`${getCurrentTimestamp()} 👀 - getActivationTargets - Fetching Data Cloud activation targets...`);

    const response = await fetch(`${domainUrl}/services/data/v63.0/ssot/activation-targets`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `There was an error when trying to get Data Cloud activation targets: ${response.status} - ${response.statusText}`
      );
    }

    console.log(
      `${getCurrentTimestamp()} ✅ - getActivationTargets - Data Cloud activation target information successfully provided!`
    );

    res.status(200).send({
      message: "Data Cloud Activation Targets",
      activationTargets: data,
    });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - getActivationTargets - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default getActivationTargets;
