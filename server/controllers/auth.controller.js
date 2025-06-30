// Env variables
import { 
    SECRET_JWT_KEY, 
    ACCESS_TOKEN_SESSION_EXPIRATION_TIME_STR, 
    REFRESH_TOKEN_SESSION_EXPIRATION_TIME_STR, 
    ACCESS_TOKEN_SESSION_EXPIRATION_TIME_INT,
    REFRESH_TOKEN_SESSION_EXPIRATION_TIME_INT,
    NODE_ENV 
} from '../config.js';

// Modules
import bcrypt from 'bcrypt';  // Hashing passwords
import jwt from 'jsonwebtoken'; // JWT tokens for sessions
import cryto from 'crypto'; // Hashing refresh token for session

// Models
import SystemUser from "../models/SystemUserModel/SystemUser.js" ; // Ssytem User Model
import UserData from '../models/UserDataModel/UserData.js';
import SessionRefreshToken from '../models/session_refresh_tokens/SessionRefreshTokens.js'

// Tools Functions
import { minutes2milisec, getMySQLDateTime } from '../tools/tools.js';
import { error } from 'console';



// Function to create JW Tokens
function signJWT(data2Store, expirationTime){
    const payload = { ...data2Store}; // Clone object

    try{ // Try to delete iat and exp properties if they exist
        delete payload.exp;
        delete payload.iat;
    } catch {}

    return jwt.sign(
                payload,
                SECRET_JWT_KEY,
                {
                    expiresIn: expirationTime  
                } // Token expiration time
            );
}

// Function to hash Refresh Token for Session
async function hashToken(token) {
  return await bcrypt.hash(token, 10);
}

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
                console.log("Login successfull : ", isValid);
                
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
                        
                        // ----  Create JWT For Session - Access Token
                        const accessToken = signJWT(currentUser, ACCESS_TOKEN_SESSION_EXPIRATION_TIME_STR);
                        
                        // ----  Create JWT For Session - Refresh Token
                        const refreshToken = signJWT(currentUser, REFRESH_TOKEN_SESSION_EXPIRATION_TIME_STR);

                        // --- Create Session in DB table - Store Refresh Token
                        const data = {
                            systemUserID: currentUser.id, // SystemUser ID
                            refresh_token_hash: await hashToken(refreshToken),  // hashed Refreshed token  
                            created_at: getMySQLDateTime(), // NOW
                            expires_at: getMySQLDateTime(new Date(Date.now() + minutes2milisec(REFRESH_TOKEN_SESSION_EXPIRATION_TIME_INT))), // Now + Refresh Token Expiration time
                            user_agent: req.get('User-Agent'),  // Requestor's Aplication (Google, Mozila, etc)
                            ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress, // Requestor ip address
                            revoked: 0  // Not revoked
                        }
                        
                        // Insert Session in DB
                        const status = await SessionRefreshToken.insert(data);

                        if(!status){
                            // Operation Not Successfull
                            res.status(500).json({ error: "Hubo un problema al autorizar al usuario." });
                            return;
                        }

                        // Server Complete Response
                        res
                            .cookie(  // Save in cookie session - AccessToken
                                'access_token',
                                accessToken,
                                {
                                    httpOnly: true,  // Cooke only accesible from server
                                    secure: NODE_ENV === 'production', // Cookie only accesible in https
                                    sameSite: 'Strict', // Cookie is only accesible in the same domain
                                    maxAge: minutes2milisec(ACCESS_TOKEN_SESSION_EXPIRATION_TIME_INT) // Cookie Life Time of 15 minutes
                                }
                            )
                            .cookie(  // Save in cookie session - RefreshToken
                                'refresh_token',
                                refreshToken,
                                {
                                    httpOnly: true,  // Cooke only accesible from server
                                    secure: NODE_ENV === 'production', // Cookie only accesible in https
                                    sameSite: 'Strict', // Cookie is only accesible in the same domain
                                    maxAge: minutes2milisec(REFRESH_TOKEN_SESSION_EXPIRATION_TIME_INT) // Cookie Life Time of 7 days
                                }
                            )
                            .send( 
                                { 
                                    status: isValid,
                                    message: 'Usuario correctamente autenticado.', 
                                    currentUser,                 // Send currenUser info
                                    accesToken: accessToken,     // Send acces Token
                                    refreshToken: refreshToken   // Send refresh Token
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
        console.log(error)
        res.status(500).json({ error: "Hubo un problema al autenticar el usuario." });
    }
};

// Function to logout and kill session
export const KillAuthUser = async (req, res) => {
    console.log("La sesión se cerró exitosamente. Usuario.");
    res
        .clearCookie('access_token')  // Clean Access Cookie
        .clearCookie('refresh_token') // Clean Refresh Cookie
        .json({ message: 'La sesión se cerró exitosamente.'})
};

// Function for Refreshing User Session Token 
export const refreshUserToken = async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    if(!refresh_token) return res.status(401).json({ error: "Usuario No Autorizado." }); // Unauthorized error

    // Verify if refresh_token isnt revoked, deleted or expired in bd: session_refresh_hash
    // Flow:
    /*
        Usuario hace login → generas refresh_token y lo:

            Envías como cookie (HttpOnly)

            Guardas su hash en la tabla junto con user_id, expires_at

        Usuario hace una petición con token expirado → se hace refresh:

            Tomas la cookie

            La hasheas

            Buscas en la tabla si existe, no está revocado, y no ha expirado

        Si es válido:

            Generas nuevo access_token

            Opcional: reemplazas o actualizas refresh_token

        Si el usuario cierra sesión o cambia contraseña:

            Eliminas o revocas todos los refresh tokens del usuario
    */

    try{
        const data = jwt.verify(refresh_token, SECRET_JWT_KEY); // Verify Refresh Token
        
        const newAccessToken = signJWT(req.refreshSession.currentUser, ACCESS_TOKEN_SESSION_EXPIRATION_TIME_STR);
        
        const currentUser = req.refreshSession.currentUser; // User Data 

        res 
            .cookie(  // OverWrite in cookie session - AccesToken
                    'access_token',
                    newAccessToken,
                    {
                        httpOnly: true,  // Cooke only accesible from server
                        secure: NODE_ENV === 'production', // Cookie only accesible in https
                        sameSite: 'Strict', // Cookie is only accesible in the same domain
                        maxAge: minutes2milisec(ACCESS_TOKEN_SESSION_EXPIRATION_TIME_INT) // Cookie Life Time of 15 minutes
                    }
                )
            .send( 
                    { 
                        status: true,
                        message: 'Refresh: Usuario correctamente autenticado.', 
                        currentUser,                    // Send currenUser info
                        accesToken: newAccessToken,     // Send acces Token
                        refreshToken: refresh_token     // Send refresh Token
                    } 
                ); // Send user and token to client
    } catch (error){
        return res.status(403).json({ error: "Hubo un problema al autenticar el usuario." });
    }
}