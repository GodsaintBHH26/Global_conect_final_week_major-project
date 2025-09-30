import express from 'express';
import { getUser, updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails); //Route to add basic user details - bio, profilePic, education, experience etc...
router.get('/:id', getUser); // Route to get the details of a particular user


export default router;