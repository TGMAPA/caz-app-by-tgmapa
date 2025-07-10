// Modules
import express from 'express';

// System User Controller Functions
import { createUser } from '../controllers/systemuser.controller.js';
import { createUserPosition } from '../controllers/userPositions.controller.js';
import { createUserPrivilege, getAllUsers } from '../controllers/userPrivilege.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== User Data Routes
// Create User
router.post('/createUser', createUser);

// Create User Position
router.post('/createUserPosition', createUserPosition);

// Create User Privilege
router.post('/createUserPrivilege', createUserPrivilege);

// Create User Position - Privilege
router.post('/createUserPrivilege', createUserPrivilege);

// Get All User Position - Privilege 
router.post('/getAllUserPrivileges', getAllUsers);

export default router;