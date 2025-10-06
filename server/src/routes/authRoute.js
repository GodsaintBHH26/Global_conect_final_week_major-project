import express from 'express';
import { logUserIn, registerUser, forgotPassword, resetPassword, verifyOTP, resendOtpController } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logUserIn);
router.post('/verify-otp', verifyOTP);
router.post("/resend-otp", resendOtpController);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); 

export default router;