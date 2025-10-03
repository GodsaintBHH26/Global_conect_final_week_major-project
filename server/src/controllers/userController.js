import User from "../models/user.js";

/**
 * PUT /api/user/add-details             ---- Please don't remove it again we need this one - I'll explain later why
 *
 */
export const updateBasicDetails = async (req, res) => {
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

/**
 * GET /api/user/:id
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * PUT /api/user/:id
 */
export const updateUser = async (req, res) => {
  try {
    // only allow user or admin
    if (!req.user.uid) {
      return res.status(403).json({ msg: "Please Login" });
    }

    const updates = req.body;
    if (updates.password) delete updates.password; // password update should be separate
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * POST /api/user/:id/connect
 * send connection request (adds to connectionRequests of target)
 */
export const sendConnectionRequest = async (req, res) => {
  try {
    const { targetId } = req.params;
    if (targetId === req.user.uid)
      return res.status(400).json({ msg: "Cannot connect to self" });

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ msg: "Target user not found" });

    // if already connected
    if (target.connections.includes(req.user.uid))
      return res.status(400).json({ msg: "Already connected" });

    // add request if not present
    if (!target.connectionRequests.includes(req.user.uid)) {
      target.connectionRequests.push(req.user.uid);
      await target.save();
    }

    res.json({ msg: "Connection request sent" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * POST /api/users/:id/accept
 * accept connection request
 */
export const acceptConnection = async (req, res) => {
  try {
    const { requesterId } = req.params;
    const user = await User.findById(req.user.uid);
    const requester = await User.findById(requesterId);
    if (!requester) return res.status(404).json({ msg: "Requester not found" });
    if (user.connections.includes(requester._id))
      return res.status(400).json({ msg: "User already in connections" });
    // remove from connectionRequests
    user.connectionRequests = user.connectionRequests.filter(
      (id) => id.toString() !== requesterId
    );
    // add to connections both sides if not present
    if (!user.connections.includes(requesterId)) {
      user.connections.push(requesterId);
      requester.connections.push(user._id);
    }

    await user.save();
    await requester.save();

    res.json({ msg: "Connection accepted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  GET /api/users/all
export const getAllUsers = async (req, res) =>{
  try {
    const allUsers = await User.find({}).select('-password');
    res.json({allUsers})
  } catch (error) {
    res.status(500).json({msg:"Couldn't fetch user datas."})
  }
}