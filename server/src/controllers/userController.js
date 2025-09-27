import User from "./models/User.js";

/**
 * GET /api/users/:id
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * PUT /api/users/:id
 */
export const updateUser = async (req, res) => {
  try {
    // only allow user or admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updates = req.body;
    if (updates.password) delete updates.password; // password update should be separate
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/users/:id/connect
 * send connection request (adds to connectionRequests of target)
 */
export const sendConnectionRequest = async (req, res) => {
  try {
    const targetId = req.params.id;
    if (targetId === req.user._id.toString()) return res.status(400).json({ message: "Cannot connect to self" });

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: "Target user not found" });

    // if already connected
    if (target.connections.includes(req.user._id)) return res.status(400).json({ message: "Already connected" });

    // add request if not present
    if (!target.connectionRequests.includes(req.user._id)) {
      target.connectionRequests.push(req.user._id);
      await target.save();
    }

    res.json({ message: "Connection request sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/users/:id/accept
 * accept connection request
 */
export const acceptConnection = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const user = await User.findById(req.user._id);
    const requester = await User.findById(requesterId);
    if (!requester) return res.status(404).json({ message: "Requester not found" });

    // remove from connectionRequests
    user.connectionRequests = user.connectionRequests.filter((id) => id.toString() !== requesterId);
    // add to connections both sides if not present
    if (!user.connections.includes(requesterId)) user.connections.push(requesterId);
    if (!requester.connections.includes(user._id)) requester.connections.push(user._id);

    await user.save();
    await requester.save();

    res.json({ message: "Connection accepted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
