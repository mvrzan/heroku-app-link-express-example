import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import salesforceRoutes from "./src/routes/salesforce-routes.js";
import noneSalesforceRoutes from "./src/routes/none-salesforce-routes.js";
import { getCurrentTimestamp } from "./src/utils/loggingUtil.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(salesforceRoutes);
app.use(noneSalesforceRoutes);

app.listen(port, () => {
  console.log(`${getCurrentTimestamp()} 🎬 Authentication server listening on port: ${port}`);
});
