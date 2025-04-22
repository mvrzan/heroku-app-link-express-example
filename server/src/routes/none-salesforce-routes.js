import { Router } from "express";
import localTestRoute from "../controllers/localTestRoute.js";
import getJoke from "../controllers/joke/getJoke.js";

const noneSalesforceRoutes = Router();

noneSalesforceRoutes.get("/v1/localTestRoute", localTestRoute);
noneSalesforceRoutes.get("/v1/jokes", getJoke);

export default noneSalesforceRoutes;
