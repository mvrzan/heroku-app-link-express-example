import { Router } from "express";
import handleDataCloudDataChangeEvent from "../controllers/data-cloud/handleDataCloudDataChangeEvent.js";
import getSegments from "../controllers/data-cloud/getSegments.js";
import getLimits from "../controllers/data-cloud/getLimits.js";
import getActivationTargets from "../controllers/data-cloud/getActivationTargets.js";
import { initSalesforceSdk } from "../middleware/heroku-service-mesh.js";
import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const salesforceRoutes = Router();

const initMiddleware = async () => {
  try {
    console.log(`${getCurrentTimestamp()} 🔧 - Initializing Salesforce routes...`);
    const { salesforceMiddleware, withSalesforceConfig, asyncMiddleware } = await initSalesforceSdk();

    salesforceRoutes.post(
      "/v1/handleDataCloudDataChangeEvent",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      asyncMiddleware(handleDataCloudDataChangeEvent)
    );

    salesforceRoutes.get(
      "/v1/segments",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      getSegments
    );

    salesforceRoutes.get("/v1/limits", withSalesforceConfig({ parseRequest: true }), salesforceMiddleware, getLimits);

    salesforceRoutes.get(
      "/v1/activationTargets",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      getActivationTargets
    );

    console.log(`${getCurrentTimestamp()} ✅ Salesforce routes registered successfully!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ Failed to initialize Salesforce routes: ${error.message}`);
  }
};

await initMiddleware();

export default salesforceRoutes;
