import express from 'express';
import { logUserIn, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', logUserIn);

export default router;