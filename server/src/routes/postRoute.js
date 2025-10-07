import express from "express";
import Post from "../models/Post.js"
import authMiddleware from "../middleware/authMiddleware.js";
//import { upload } from "../utils/multer.js";
import upload from "../config/multerLocal.js";
import { createPost, getFeed, likePost, commentPost } from "../controllers/postController.js";;

const router = express.Router();

//router.post("/", authMiddleware, upload.single("image"), createPost);
router.post("/",authMiddleware, upload.single("image"), createPost);
  
router.get("/feed", authMiddleware, getFeed);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;
