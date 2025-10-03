import express from 'express';
import { acceptConnection, getAllUsers, getUser, sendConnectionRequest, updateBasicDetails, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/add-details', authMiddleware, updateBasicDetails); //Route to add basic user details - bio, profilePic, education, experience etc...
router.get('/all', getAllUsers);
router.get('/:id', getUser); // Route to get the details of a particular user
router.post('/:targetId/connect', authMiddleware, sendConnectionRequest);
router.post('/:requesterId/accept', authMiddleware, acceptConnection);

export default router;