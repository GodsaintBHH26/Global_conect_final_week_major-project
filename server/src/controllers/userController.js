import User from "../models/user.js";

export const updateUserDetails = async (req, res) => {
  const { uid } = req.user;
  const { bio, profilePic, experience, education, skills } = req.body;

  try {
    const user = await User.findById(uid);
    if (!user) return res.status(400).json({ msg: "User doesn't exist ❌" });

    // Checks the fields and updates the database on that basis
    if (bio !== undefined) user.bio = bio;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (skills) user.skills = [...user.skills, ...skills];
    if (experience) user.experience = [...user.experience, ...experience];
    if (education) user.education = [...user.education, ...education];

    await user.save();
    res.status(200).json({ msg: "Successfully updated user details ✅", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
