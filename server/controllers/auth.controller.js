// Env variables
import { SECRET_JWT_KEY, SESSION_EXPIRATION_TIME, NODE_ENV } from '../config.js';

// Modules
import bcrypt from 'bcrypt';  // Hashing passwords
import jwt from 'jsonwebtoken'; // JWT tokens for sessions

// Models
import SystemUser from "../models/SystemUserModel/SystemUser.js" ; // Ssytem User Model
import UserData from '../models/UserDataModel/UserData.js';


// ===== Controller Functions

// Function to Authenticate a System User and error handling - Login
export const authUser = async (req, res) => {
    try {
        // Input Data
        const data = req.body;
        
        // Verify username duplicates
        const [status, result] = await SystemUser.getBy({ username: data.username });

        if( status ){  
            // Operation Successfull
            
            if( result.length < 0){ // Search username in db
                // Username doesnt exist
                res.status(500).json({ error: "El username no existe." });
                return;
            }else{
                // Valid Username
                
                // Password Validation
                const validUser = result[0]; // SystemData Info
                
                const isValid = await bcrypt.compare(data.password, validUser.password);
                console.log("Login successfull: ", isValid);
                
                if(isValid){
                    // ---- Valid Auth User

                    // Get Complementary Information from UserData
                    const [status, resultUserData] = await UserData.getByID(validUser.userID); 

                    if(status && resultUserData.length === 1){ // Operation Successfull 

                        // Build Current User with systemuser and user data information
                        const currentUser = {
                            id: validUser.id,
                            userID: validUser.userID,
                            username: validUser.username,
                            personalEmail: resultUserData[0].personalEmail,
                            position: resultUserData[0].position
                        } 

                        // Show logged user
                        console.log("User logging: ", currentUser);
                        
                        // ----  Create JWT For Session
                        const token = jwt.sign(
                            currentUser,
                            SECRET_JWT_KEY,
                            {
                                expiresIn: SESSION_EXPIRATION_TIME  
                            } // Token expiration time
                        );

                        // Server Complete Response
                        res
                            .cookie(  // Save in cookie session
                                'access_token',
                                token,
                                {
                                    httpOnly: true,  // Cooke only accesible from server
                                    secure: NODE_ENV === 'production', // Cookie only accesible in https
                                    sameSite: 'Strict', // Cookie is only accesible in the same domain
                                    maxAge: 1000 * 60 * 60  // Cookie Life Time of 1 hr
                                }
                            )
                            .send( 
                                { 
                                    status: isValid,
                                    message: 'Usuario correctamente autenticado.',
                                    currentUser, 
                                    token 
                                } 
                            ); // Send user and token to client
                    }else{
                        // Operation Not Successfull
                        res.status(500).json({ error: "Hubo un problema al autenticar el usuario." });
                    }      
                }else{
                    // Invalid Auth User
                    res.status(500).json({ status: isValid, error: "Contraseña Incorrecta." });
                }
            }
        }else{
            // Operation Not Successfull
            res.status(500).json({ error: "Hubo un problema al autenticar el usuario." });
        }   
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al autenticar el usuario." });
    }
};

// Function to logout and kill session
export const KillAuthUser = async (req, res) => {
    res
        .clearCookie('access_token')  // Clean Cookie
        .json({ message: 'La sesión se cerró exitosamente.'})
};