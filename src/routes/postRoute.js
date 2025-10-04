import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
//import { upload } from "../utils/multer.js";
import upload from "../config/multerLocal.js";
import { createPost, getFeed, likePost, commentPost } from "../controllers/postController.js";;

const router = express.Router();

//router.post("/", authMiddleware, upload.single("image"), createPost);
router.post("/",authMiddleware, upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      res.json({
        message: "File uploaded successfully",
        filePath: `/uploads/posts${req.file.filename}`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
router.get("/feed", authMiddleware, getFeed);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;