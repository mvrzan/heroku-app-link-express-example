import { Router } from "express";
import localTestRoute from "../controllers/localTestRoute.js";

const noneSalesforceRoutes = Router();

noneSalesforceRoutes.get("/v1/localTestRoute", localTestRoute);

export default noneSalesforceRoutes;
