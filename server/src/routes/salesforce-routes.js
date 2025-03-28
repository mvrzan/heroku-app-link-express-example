import { Router } from "express";
import handleDataCloudDataChangeEvent from "../controllers/handleDataCloudDataChangeEvent.js";
import getSegments from "../controllers/getSegments.js";
import postSegments from "../controllers/postSegments.js";
import { initSalesforceSdk } from "../middleware/heroku-service-mesh.js";
import healthcheck from "../controllers/healthcheck.js";
import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { parseRequest } from "@heroku/salesforce-sdk-nodejs";

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

    salesforceRoutes.post(
      "/v1/segments",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      postSegments
    );

    salesforceRoutes.get(
      "/healthcheck",
      withSalesforceConfig({ parseRequest: false }),
      salesforceMiddleware,
      healthcheck
    );

    console.log(`${getCurrentTimestamp()} ✅ Salesforce routes registered successfully!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ Failed to initialize Salesforce routes: ${error.message}`);
  }
};

await initMiddleware();

export default salesforceRoutes;
