// Modules
import express from 'express';

// Controller Functions
import { authUser } from '../controllers/auth.controller.js';


// -- Router Instance for routes handling
const router = express.Router();

// =============== Auth Users Routes
// Auth System User
router.post('/authUser', authUser);


export default router;