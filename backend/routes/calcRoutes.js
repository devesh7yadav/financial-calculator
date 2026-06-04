import express from "express";
import { findInterest } from "../controllers/calculatorControllers.js";

const router = express.Router();


router.route("/interest").post(findInterest);
/*
router.route("/savings-goal").post();
router.route("/mortgage").post();
router.route("/budget").post();
*/

export default router;