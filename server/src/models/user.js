import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lower:true },
    password: { type: String, required: true },
    bio: { type: String },
    profilePic: { type: String },
    experience: [
      {
        company: { type: String },
        role: { type: String },
        from: { type: Date },
        to: { type: Date },
      },
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        from: { type: Date },
        to: { type: Date },
      },
    ],
    skills: [{ type: String }],
    connections: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    connectionRequests: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    savedJobs: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
