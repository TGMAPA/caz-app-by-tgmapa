// Modules
import bcrypt from 'bcrypt';  // Hashing passwords

// Models
import SystemUser from "../models/SystemUserModel/SystemUser.js" ; // Ssytem User Model



// ===== Controller Functions

// Function to create a System User and error handling
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
                const isValid = await bcrypt.compare(data.password, result[0].password);
                console.log("Login successfull: ", isValid);

                if(isValid){
                    // Valid Auth User
                    res.json(
                        { 
                            status: isValid, 
                            message: 'Usuario correctamente autenticado.'
                        }
                    );
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