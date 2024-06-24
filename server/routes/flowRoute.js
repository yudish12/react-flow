import express from "express";
import { checkAuth } from "../middlewares/Auth.js";
import { getFlowChart } from "../controllers/flowController.js";
const router = express.Router();

router.get("/", checkAuth, getFlowChart);

export default router;
