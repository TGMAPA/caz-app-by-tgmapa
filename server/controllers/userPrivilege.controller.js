// User Model
import UserPrivilege from '../models/UserPrivilege/UserPrivilege.js';


// ===== Controller Functions

// Function to create User Positions and error handling
export const createUserPrivilege = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await UserPrivilege.getBy({ name: data.name });
        
        if( status ){ // Operation Successfull
            // Search possible duplicated values
            let duplicatedValue = false; // Flag to show duplicated values existence
            if( result.length > 0 ){ // Possible duplicated values
                // Search in possible coincidences (Not Logicaly Deleted)
                for (let i = 0; i < result.length; i++) {
                    if( result[i].LogDelete != "NULL" && result[i].name === data.name){
                        // Duplicated Value (Condition: name)
                        duplicatedValue = true;
                    }
                }
            }

            // Validate duplicate Existence
            if(!duplicatedValue){
                // No Duplicate Existence

                // --------- Create new user Position ---------
                const status = await UserPrivilege.insert(data);
                if(status){ // If status = true: Insertion Successfull
                    res.json(
                        { 
                            status: status, 
                            message: 'Privilegio de Usuario creado exitosamente.'
                        }
                    );
                }else{ // Insertion Not Successfull
                    res.status(500).json({ error: "Hubo un problema al crear el privilegio de usuario." });
                }      

            }else{
                // Duplicate Existence!!
                res.status(500).json({ error: "El privilegio de usuario ya existe en la base de datos." });
            }
        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al crear el privilegio de usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el privilegio de usuario." });
    }
};

// Function to get all the users Privileges in db and error handling
export const getAllUsers = async (req, res) => {
    try {
        const [status, userPrivileges] = await UserPrivilege.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    usersPrivileges: userPrivileges, 
                    message: 'Se obtuvieron los Privilegios de Usuarios exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener a los Privilegios de Usuarios." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener a los Privilegios de Usuarios." });
    }
};