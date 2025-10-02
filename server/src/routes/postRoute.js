import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { createPost, getFeed, likePost, commentPost } from "../controllers/postController.js";;

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/feed", authMiddleware, getFeed);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;