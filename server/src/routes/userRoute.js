import express from 'express';
import { updateUserDetails } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateUserDetails);

export default router;