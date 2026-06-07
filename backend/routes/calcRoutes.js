import express from "express";
import { budget, findInterest, mortgage, savingsGoal } from "../controllers/calculatorControllers.js";

const router = express.Router();

router.post("/interest", findInterest);
router.post("/savings", savingsGoal);
router.post("/mortgage", mortgage);
router.post("/budget", budget);

export default router;