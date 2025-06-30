// Modules
import bcrypt from 'bcrypt';  // Hashing passwords

// User Model
import SessionRefreshToken from "../models/session_refresh_tokens/SessionRefreshTokens.js" ;



// ===== Controller Functions

// Function to create a Session Refresh Token and error handling
/*
export const createSessionRefreshToken = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await SessionRefreshToken.getBy({ username: data.username });
        
        
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el usuario." });
    }
};
*/