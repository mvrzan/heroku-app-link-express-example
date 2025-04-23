import { Router } from "express";
import getJoke from "../controllers/none-salesforce/getJoke.js";
import getTodos from "../controllers/none-salesforce/getTodos.js";
import postTodos from "../controllers/none-salesforce/postTodos.js";
import healthcheck from "../controllers/none-salesforce/healthcheck.js";

const noneSalesforceRoutes = Router();

noneSalesforceRoutes.get("/v1/joke", getJoke);
noneSalesforceRoutes.get("/v1/get-todos", getTodos);
noneSalesforceRoutes.post("/v1/post-todos", postTodos);
noneSalesforceRoutes.get("/v1/healthcheck", healthcheck);

export default noneSalesforceRoutes;
