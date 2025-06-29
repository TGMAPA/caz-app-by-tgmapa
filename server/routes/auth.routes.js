// Modules
import express from 'express';

// Controller Functions
import { authUser, KillAuthUser, refreshUserToken } from '../controllers/auth.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== Auth Users Routes
// Auth System User
router.post('/authUser', authUser);

// Kill Auth System User
router.post('/KillAuthUser', KillAuthUser);

// Refresh User Token
router.post('/refreshUserToken', refreshUserToken);


export default router;