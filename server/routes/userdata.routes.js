// Modules
import express from 'express';

// Controller Functions
import { getAllUsers, createUser, updateUser, getUserByID, logicDelete, physicalDelete } from '../controllers/userdata.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== User Data Routes
// Create User
router.post('/createUser', createUser);

// Update user
router.post('/updateUser', updateUser);

// Get all users
router.get('/getAllUsers', getAllUsers);

// Get user by ID
router.get('/getUserByID', getUserByID);

// Logical Delete user
router.post('/userLogicalDelete', logicDelete);

// Physical Delete user
router.post('/userPhysicalDelete', physicalDelete);


export default router;