// User Model
import UserPosition from '../models/UserPosition/UserPosition.js';


// ===== Controller Functions

// Function to create User Positions and error handling
export const createUserPosition = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await UserPosition.getBy({ name: data.name });
        
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
                const status = await UserPosition.insert(data);
                if(status){ // If status = true: Insertion Successfull
                    res.json(
                        { 
                            status: status, 
                            message: 'Posición de Usuario creada exitosamente.'
                        }
                    );
                }else{ // Insertion Not Successfull
                    res.status(500).json({ error: "Hubo un problema al crear la posición de usuario." });
                }      

            }else{
                // Duplicate Existence!!
                res.status(500).json({ error: "La posición de usuario ya existe en la base de datos." });
            }
        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al crear la posición de usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear la posición de usuario." });
    }
};
