import { Router } from "express";
import handleDataCloudDataChangeEvent from "../controllers/handleDataCloudDataChangeEvent.js";
import localTestRoute from "../controllers/localTestRoute.js";
import getSegments from "../controllers/getSegments.js";

const router = Router();

router.post("/v1/handleDataCloudDataChangeEvent", handleDataCloudDataChangeEvent);
router.post("/v1/localTestRoute", localTestRoute);
router.get("/v1/getSegments", getSegments);

export default router;
