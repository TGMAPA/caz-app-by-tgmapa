import express from 'express';
import { getAllUsers, createUser, updateUser, getUserByID, logicDelete, physicalDelete} from '../controllers/users.controller.js';

const router = express.Router();

// Create User
router.post('/createUser', createUser);

// Get all users
router.get('/getAllUsers', getAllUsers);

// Get user by ID
router.get('/getUserByID', getUserByID);

// Update user
router.post('/updateUser', updateUser);

// Logical Delete user
router.post('/userLogicalDelete', logicDelete);

// Physical Delete user
router.post('/userPhysicalDelete', physicalDelete);


export default router;