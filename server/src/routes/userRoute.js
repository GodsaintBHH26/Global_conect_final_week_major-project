/*import express from 'express';
import { getUser, updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails); //Route to add basic user details - bio, profilePic, education, experience etc...
router.get('/:id', getUser); // Route to get the details of a particular user


export default router;*/

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { getUser, updateUser, sendConnectionRequest, acceptConnection } from "../controllers/userController.js";
import { updateBasicDetails } from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", authMiddleware, getUser);
router.put('/add-details', authMiddleware, updateBasicDetails);

// Upload profile/banner image (Cloudinary)
router.post("/:id/upload",authMiddleware , upload.single("file"), async (req, res) => {
  try {
    const User = (await import("../models/user.js")).default;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // req.file.path = Cloudinary URL
    if (req.body.type === "profile") user.profilePic = req.file.path;
    else user.bannerPic = req.file.path;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user profile (protected, owner/admin only)
router.put("/:id", authMiddleware, updateUser);

// ✅ Send connection request
router.post("/:id/connect", authMiddleware, sendConnectionRequest);

// ✅ Accept connection request
router.post("/:id/accept", authMiddleware, acceptConnection);

export default router;