import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/createJob", createJob); // Create
router.get("/getJobs", getJobs); // Read all
router.get("/signleJob/:id", getJobById); // Single job
router.put("/updateJob/:id", updateJob); // Update
router.delete("/deleteJob/:id", deleteJob); // Delete
router.post("/applyJob/:id/apply", applyJob); // Apply for job
export default router;
