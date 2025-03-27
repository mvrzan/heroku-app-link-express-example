import { Router } from "express";
import handleDataCloudDataChangeEvent from "../controllers/handleDataCloudDataChangeEvent.js";
import getSegments from "../controllers/getSegments.js";
import { initSalesforceSdk } from "../middleware/heroku-service-mesh.js";
import healthcheck from "../controllers/healthcheck.js";
import { getCurrentTimestamp } from "../utils/loggingUtil.js";

// Create the router
const router = Router();

// Create a promise that resolves to the configured router
const salesforceRoutesPromise = (async () => {
  try {
    console.log(`${getCurrentTimestamp()} 🔧 - Initializing Salesforce SDK...`);
    const { salesforceMiddleware, withSalesforceConfig, asyncMiddleware } = await initSalesforceSdk();

    console.log(`${getCurrentTimestamp()} 📝 - Registering Salesforce routes...`);

    // Add a simple health check route that doesn't require Salesforce auth
    router.get("/sf-healthcheck", (req, res) => {
      res.status(200).send("Salesforce router initialized");
    });

    // Add a route to check headers
    router.get("/check-headers", (req, res) => {
      res.status(200).json({
        message: "Headers received",
        headers: req.headers,
      });
    });

    // Register the Salesforce routes
    router.post(
      "/v1/handleDataCloudDataChangeEvent",
      withSalesforceConfig({ parseRequest: true }),
      salesforceMiddleware,
      asyncMiddleware(handleDataCloudDataChangeEvent)
    );

    router.get("/v1/getSegments", withSalesforceConfig({ parseRequest: true }), salesforceMiddleware, getSegments);

    router.get("/healthcheck", withSalesforceConfig({ parseRequest: false }), salesforceMiddleware, healthcheck);

    console.log(`${getCurrentTimestamp()} ✅ - Salesforce routes registered successfully!`);
    return router;
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - Failed to initialize Salesforce routes:`, error);
    // Return a router that returns an error for all Salesforce routes
    const errorRouter = Router();
    errorRouter.use((req, res) => {
      res.status(500).json({
        error: "Salesforce SDK initialization failed",
        message: "The application failed to initialize Salesforce integration",
      });
    });
    return errorRouter;
  }
})();

export default salesforceRoutesPromise;
