// Modules
import express from 'express';

// Controller Functions
import { authUser, KillAuthUser} from '../controllers/auth.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== Auth Users Routes
// Auth System User
router.post('/authUser', authUser);

// Kill Auth System User
router.post('/KillAuthUser', KillAuthUser);


export default router;