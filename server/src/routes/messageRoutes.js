import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { sendMessage, getChatHistory } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("media"), sendMessage);
router.get("/:sender/:receiver", authMiddleware, getChatHistory);

export default router;

