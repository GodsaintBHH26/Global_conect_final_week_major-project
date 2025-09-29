import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createJob, getJobs, applyJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/",authMiddleware, getJobs);
router.post("/apply/:jobId", authMiddleware, applyJob);

export default router;
