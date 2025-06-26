// User Model
import SystemUser from "../models/SystemUserModel/SystemUser.js" ;


// ===== Controller Functions

// Function to create a System User and error handling
export const createUser = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        

        // Create new user
        const status = await SystemUser.insert(data);
        if(status){ // If status = true: Insertion Successfull
            res.json(
                { 
                    status: status, 
                    message: 'Usuario creado exitosamente'
                }
            );
        }else{ // Insertion Not Successfull
            res.status(500).json({ error: "Hubo un problema al crear el usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el usuario." });
    }
};