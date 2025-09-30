import Job from "../models/Job.js";
import User from "../models/user.js";

// 👉 Create Job
export const createJob = async (req, res) => {
  try {
    const { postedBy, title, description, skills, location } = req.body;
    console.log("title:", title);
    console.log("description:", description);

    // Check if the user exists
    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    const job = new Job({
      postedBy,
      title,
      description,
      skills,
      location,
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👉 Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email profilePic")
      .populate("applicants", "name email profilePic");

    res.json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👉 Get Single Job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email profilePic")
      .populate("applicants", "name email profilePic");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    console.error("Get Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👉 Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👉 Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👉 Apply for a Job
export const applyJob = async (req, res) => {
  try {
    const { userId } = req.body; // applicant userId
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.applicants.push(userId);
    await job.save();

    res.json({ message: "Applied successfully", job });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
