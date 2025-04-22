import { Router } from "express";
import localTestRoute from "../controllers/localTestRoute.js";
import getJoke from "../controllers/joke/getJoke.js";

const noneSalesforceRoutes = Router();

noneSalesforceRoutes.get("/v1/localTestRoute", localTestRoute);
noneSalesforceRoutes.get("/v1/joke", getJoke);

export default noneSalesforceRoutes;
