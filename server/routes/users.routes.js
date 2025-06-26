import express from 'express';
import { getAllUsers, createUser, updateUser} from '../controllers/users.controller.js';

const router = express.Router();

// Create User
router.post('/createUser', createUser);

// Get all users
router.get('/getAllUsers', getAllUsers);

// Update user
router.post('/updateUser', updateUser);

// Logical Delete user
router.post('/userLogicalDelete', updateUser);

// Physical Delete user
router.post('/userPhysicalDelete', updateUser);


export default router;