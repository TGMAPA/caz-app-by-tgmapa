// Modules
import bcrypt from 'bcrypt';  // Hashing passwords

// Env variables
import { 
    REFRESH_TOKEN_SESSION_EXPIRATION_TIME_INT
} from '../config.js';

// User Model
import SessionRefreshToken from "../models/session_refresh_tokens/SessionRefreshTokens.js" ;



// ===== Controller Functions

// Function to create a Session Refresh Token and error handling
export const createSessionRefreshToken = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        const status = SessionRefreshToken.insert(data);

        if(!status){
            // Operation Not Successfull
            res.status(500).json({ error: "Hubo un problema al autorizar al usuario." });
            return;
        }
        
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el usuario." });
    }
};
