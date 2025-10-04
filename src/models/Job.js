import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: {type: String},
    skills: [{type: String}],
    location: {type: String},
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
