import express from "express";
import { budget, findInterest, mortgage, savingsGoal } from "../controllers/calculatorControllers.js";

const router = express.Router();


router.route("/interest").post(findInterest);
router.route("/savings-goal").post(savingsGoal);
router.route("/mortgage").post(mortgage);
router.route("/budget").post(budget);


export default router;