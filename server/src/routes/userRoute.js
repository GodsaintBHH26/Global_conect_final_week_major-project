import express from 'express';
import { updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails);

export default router;