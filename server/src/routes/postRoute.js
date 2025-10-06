import express from "express";
import Post from "../models/Post.js"
import authMiddleware from "../middleware/authMiddleware.js";
//import { upload } from "../utils/multer.js";
import upload from "../config/multerLocal.js";
import { createPost, getFeed, likePost, commentPost } from "../controllers/postController.js";;

const router = express.Router();

//router.post("/", authMiddleware, upload.single("image"), createPost);
router.post("/",authMiddleware, upload.single("image"), async(req, res) => {
    try {
        const { content } = req.body;
        let fileUrl = "";
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const newPost = new Post({
        userId:req.user.uid,
        content,
        image:`/global_connect/posts/${req.file.filename}`
      })
      await newPost.save();
      res.status(201).json({
        newPost,
        message: "File uploaded successfully",
        filePath: `/global_connect/posts/${req.file.filename}`,});
      console.log("Posting successfully")
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
router.get("/feed", authMiddleware, getFeed);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;
