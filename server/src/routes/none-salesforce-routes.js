import { Router } from "express";
import localTestRoute from "../controllers/localTestRoute.js";
import getJoke from "../controllers/joke/getJoke.js";
import getTodos from "../controllers/todo/getTodos.js";
import postTodos from "../controllers/todo/postTodos.js";

const noneSalesforceRoutes = Router();

noneSalesforceRoutes.get("/v1/localTestRoute", localTestRoute);
noneSalesforceRoutes.get("/v1/joke", getJoke);
noneSalesforceRoutes.get("/v1/get-todos", getTodos);
noneSalesforceRoutes.post("/v1/post-todos", postTodos);

export default noneSalesforceRoutes;
