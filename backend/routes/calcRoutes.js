import express from "express";
import { budget, findInterest, mortgage, savingsGoal } from "../controllers/calculatorControllers.js";

const router = express.Router();

/*
router.route("/interest").post(findInterest);
router.route("/savings-goal").post(savingsGoal);
router.route("/mortgage").post(mortgage);
router.route("/budget").post(budget);
*/

router.post("/interest", findInterest);
router.post("/savings", savingsGoal);
router.post("/mortgage", mortgage);
router.post("/budget", budget);

export default router;