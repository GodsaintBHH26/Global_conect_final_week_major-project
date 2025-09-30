import express from "express";
import {
  getChatHistory,
  postMessages,
} from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:senderId/:receiverId", getChatHistory);
router.post("/", authMiddleware, postMessages);

export default router;