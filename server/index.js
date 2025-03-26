import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/route-collection.js";
import { getCurrentTimestamp } from "./src/utils/loggingUtil.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  console.log(`${getCurrentTimestamp()} 🎬 Authentication server listening on port: ${port}`);
});
