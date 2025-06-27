// Modules
import bcrypt from 'bcrypt';  // Hashing passwords

// User Model
import SystemUser from "../models/SystemUserModel/SystemUser.js" ;


// ===== Controller Functions

// Function to create a System User and error handling
export const createUser = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await SystemUser.getBy({ username: data.username });
        
        if( status ){ // Operation Successfull
            // Search possible duplicated values
            let duplicatedValue = false; // Flag to show duplicated values existence
            if( result.length > 0 ){ // Possible duplicated values
                // Search in possible coincidences (Not Logicaly Deleted)
                for (let i = 0; i < result.length; i++) {
                    if( result[i].LogDelete != "NULL" && result[i].username === data.username){
                        // Duplicated Value (Condition: username)
                        duplicatedValue = true;
                    }
                }
            }

            // Validate duplicate Existence
            if(!duplicatedValue){
                // No Duplicate Existence
                
                // Hash Password
                data.password = await bcrypt.hash(data.password, 10);

                // --------- Create new user ---------
                const status = await SystemUser.insert(data);
                if(status){ // If status = true: Insertion Successfull
                    res.json(
                        { 
                            status: status, 
                            message: 'Credenciales de Usuario creado exitosamente'
                        }
                    );
                }else{ // Insertion Not Successfull
                    res.status(500).json({ error: "Hubo un problema al crear el usuario." });
                }       
            }else{
                // Duplicate Existence!!
                res.status(500).json({ error: "El username ya esta existe en la base de datos." });
            }
        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al crear el usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el usuario." });
    }
};
