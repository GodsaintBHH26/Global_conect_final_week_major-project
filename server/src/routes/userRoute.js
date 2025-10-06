/*import express from 'express';
import { acceptConnection, getAllUsers, getUser, sendConnectionRequest, updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails); //Route to add basic user details - bio, profilePic, education, experience etc...
router.get('/all', getAllUsers);
router.get('/:id', getUser); // Route to get the details of a particular user
router.post('/:targetId/connect', authMiddleware, sendConnectionRequest);
router.post('/:requesterId/accept', authMiddleware, acceptConnection);

export default router;*/
import express from 'express';
import User from "../models/user.js";
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
router.put("/:id/profile-image",authMiddleware, upload.single("profilePic"), async (req, res) => {
   /* try {
        //const { profilePic } = req.body;
        let fileUrl = "";
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const updatedUser = new User({
        userId:req.user.uid,
        image:`/global_connect/profilePic/${req.file.filename}`
      })
      await updatedUser.save();
      res.status(201).json({
        updatedUser,
        message: "Profile pic uploaded successfully",
        filePath: `/global_connect/profilePic/${req.file.filename}`,});
      console.log("Uploading successfully")
    } catch (err) {
      res.status(500).json({ msg: err.message });
      }
  
      res.json({
        message: "File uploaded successfully",
        filePath: `/global_connect/images/${req.file.filename}`,
      });*/
        try {
          const userId = req.params.id;
          const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
          if (!imageUrl) {
            return res.status(400).json({ message: "No image uploaded" });
          }
      
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: `/global_connect/posts/${req.file.filename}` },
            { new: true } // return updated user
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
          await updatedUser.save();
          res.status(200).json({
            updatedUser,
            message: "Profile image updated successfully",
           //filePath: `/global_connect/posts/${req.file.filename}`,
        });
            console.log("Posting successfully")
            }
         catch (error) {
          res.status(500).json({ message: error.message });
        }
    } 
  );
export default router;
