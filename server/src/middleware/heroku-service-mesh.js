import { getCurrentTimestamp } from "../utils/loggingUtil.js";
const salesforceSdk = await import("@heroku/salesforce-sdk-nodejs");

const customAsyncHandlers = {};

export const initSalesforceSdk = async () => {
  /**
   * Middleware to enrich requests with Salesforce context
   */

  console.log(`${getCurrentTimestamp()} 🏋  - herokuServiceMesh - Loading up the middleware...`);

  const salesforceMiddleware = async (req, _res, next) => {
    // Initialize SDK on request
    req.sdk = salesforceSdk.init();

    // Check if route has config to skip parsing
    const skipParsing = req.route?.salesforceConfig?.parseRequest === false;

    if (!skipParsing) {
      // Enrich request with hydrated SDK APIs
      const parsedRequest = req.sdk.salesforce.parseRequest(req.headers, req.body, req.log || console);
      req.sdk = Object.assign(req.sdk, parsedRequest);
    }
    next();
  };

  const withSalesforceConfig = (options = {}) => {
    return (req, _res, next) => {
      req.route.salesforceConfig = options;
      next();
    };
  };

  /**
   * Middleware for handling async requests
   */
  const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
      console.log(`${getCurrentTimestamp()} 🔄 Async response for ${req.method} ${req.path}`);

      const routeKey = `${req.method} ${req.path}`;
      customAsyncHandlers[routeKey] = handler;

      // Send immediate response
      res.status(201).send();

      // Process request asynchronously
      try {
        await handler(req, res);
        req.sdk.asyncComplete = true;
        console.log(`${getCurrentTimestamp()} 🔄 Async ${routeKey} completed!`);
      } catch (error) {
        console.error(`${getCurrentTimestamp()} ❌ Error in async handler for ${routeKey}:`, error);
      }
      next();
    };
  };

  console.log(`${getCurrentTimestamp()} 🦾 - herokuServiceMesh - Middleware ready!`);

  return {
    salesforceMiddleware,
    asyncMiddleware,
    withSalesforceConfig,
  };
};

export default initSalesforceSdk;
