import Job from "../models/Job.js";

/**
 * POST /api/jobs/
 */
export const createJob = async (req, res) => {
  try {
    const { title, description, skills, location } = req.body;
    const job = await Job.create({
      postedBy: req.user._id,
      title,
      description,
      skills: skills ? (Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim())) : [],
      location
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/jobs/
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).populate("postedBy", "name profilePic");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/jobs/apply/:jobId
 */
export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.includes(req.user._id)) return res.status(400).json({ message: "Already applied" });

    job.applicants.push(req.user._id);
    await job.save();
    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
