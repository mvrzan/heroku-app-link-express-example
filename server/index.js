import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import salesforceRoutes from "./src/routes/salesforce-routes.js";
import noneSalesforceRoutes from "./src/routes/none-salesforce-routes.js";
import { getCurrentTimestamp } from "./src/utils/loggingUtil.js";

const app = express();
const port = process.env.APP_PORT || process.env.PORT || 3000;

// Add a basic root route for health checks
app.get("/", (req, res) => {
  console.log("This works!");
  res.status(200).send("Express server running");
});

const corsOptions = {
  origin: "http://localhost",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(noneSalesforceRoutes);
app.use(await salesforceRoutes);

app.listen(port, () => {
  console.log(`${getCurrentTimestamp()} 🎬 Authentication server listening on port: ${port}`);
});
