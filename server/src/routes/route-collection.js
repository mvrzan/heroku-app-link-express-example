import { Router } from "express";
import handleDataCloudDataChangeEvent from "../controllers/handleDataCloudDataChangeEvent.js";
import localTestRoute from "../controllers/localTestRoute.js";
import getSegments from "../controllers/getSegments.js";
import { initSalesforceSdk } from "../middleware/heroku-service-mesh.js";
import healthcheck from "../controllers/healthcheck.js";

const router = Router();

router.get("/v1/localTestRoute", localTestRoute);

// Initialize immediately and assign middleware functions
const initMiddleware = async () => {
  try {
    console.log("Initializing Salesforce SDK...");
    const { salesforceMiddleware, withSalesforceConfig, asyncMiddleware } = await initSalesforceSdk();

    console.log("Salesforce SDK initialized successfully");

    // Add Salesforce-enabled routes after SDK is initialized
    router.post(
      "/v1/handleDataCloudDataChangeEvent",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      handleDataCloudDataChangeEvent
    );

    router.get(
      "/v1/getSegments",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      asyncMiddleware(getSegments)
    );

    router.get("/healthcheck", withSalesforceConfig({ parseRequest: false }), salesforceMiddleware, healthcheck);

    console.log("Salesforce routes registered successfully");
  } catch (error) {
    console.error("Failed to initialize Salesforce SDK:", error);
  }
};

initMiddleware();

export default router;
