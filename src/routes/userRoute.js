import express from 'express';
import { acceptConnection, getAllUsers, getUser, sendConnectionRequest, updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import upload from "../config/multerLocal.js";
const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails); //Route to add basic user details - bio, profilePic, education, experience etc...
router.get('/all', getAllUsers);
router.get('/:id', getUser); // Route to get the details of a particular user
router.post('/:targetId/connect', authMiddleware, sendConnectionRequest);
router.post('/:requesterId/accept', authMiddleware, acceptConnection);
//for uploading profile pic
router.put("/:id/profile-image",authMiddleware, upload.single("profilePic"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      res.json({
        message: "File uploaded successfully",
        filePath: `/global_connect/images${req.file.filename}`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
export default router;