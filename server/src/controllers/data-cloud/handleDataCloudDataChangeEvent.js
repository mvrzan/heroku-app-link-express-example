import { getCurrentTimestamp } from "../../utils/loggingUtil.js";

const handleDataCloudDataChangeEvent = async (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 📥 - handleDataCloudDataChangeEvent - Request received...`);

    const { context } = req.sdk;
    const accessToken = context?.org?.accessToken; // Salesforce access token
    const domainUrl = context?.org?.domainUrl; // Salesforce instance URL

    const org = await req.sdk.addons.herokuIntegration.getConnection(process.env.HEROKU_DATA_CLOUD_CONNECTION_NAME);
    const dataCloudAccessToken = org.dataCloudApi.accessToken; // Data Cloud access token
    const dataCloudTenantUrl = org.dataCloudApi.domainUrl; // Data Cloud tenant URL

    console.log("SDK enriched request object:", {
      SalesforceAccessToken: accessToken,
      SalesforceInstanceUrl: domainUrl,
      DataCloudAccessToken: dataCloudAccessToken,
      DataCloudTenantUrl: dataCloudTenantUrl,
    });

    console.log(
      `${getCurrentTimestamp()} ✅ - handleDataCloudDataChangeEvent - Data Cloud Event was received and underlying logic successfully executed!`
    );
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - handleDataCloudDataChangeEvent - Error occurred: ${error.message}`);
    res.status(500).send(error);
  }
};

export default handleDataCloudDataChangeEvent;
