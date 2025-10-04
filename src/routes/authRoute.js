import express from 'express';
import { logUserIn, registerUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logUserIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); 

export default router;