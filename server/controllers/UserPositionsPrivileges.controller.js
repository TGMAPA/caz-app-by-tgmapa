// User Model
import UserPositionsPrivileges from '../models/UserPositionsPrivileges/UserPositionsPrivileges.js';


// ===== Controller Functions

// Function to relate User Positions and User Privilege and error handling
export const relatePositionAndPrivilege = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await UserPositionsPrivileges.getBy({ positionID: data.positionID, privilegeID: data.privilegeID });
        
        if( status ){ // Operation Successfull
            // Search possible duplicated values
            let duplicatedValue = false; // Flag to show duplicated values existence
            if( result.length > 0 ){ // Possible duplicated values
                // Search in possible coincidences (Not Logicaly Deleted)
                for (let i = 0; i < result.length; i++) {
                    if( result[i].LogDelete != "NULL" && result[i].positionID === data.positionID && result[i].privilegeID === data.privilegeID){
                        // Duplicated Value (Condition: name)
                        duplicatedValue = true;
                    }
                }
            }

            // Validate duplicate Existence
            if(!duplicatedValue){
                // No Duplicate Existence

                // --------- Create new user Position ---------
                const status = await UserPositionsPrivileges.insert(data);
                if(status){ // If status = true: Insertion Successfull
                    res.json(
                        { 
                            status: status, 
                            message: 'Relación Posición-Privilegio de Usuario creada exitosamente.'
                        }
                    );
                }else{ // Insertion Not Successfull
                    res.status(500).json({ error: "Hubo un problema al crear la Relación Posición-Privilegio de Usuario." });
                }      

            }else{
                // Duplicate Existence!!
                res.status(500).json({ error: "La Relación Posición-Privilegio de Usuario ya existe en la base de datos." });
            }
        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al crear la Relación Posición-Privilegio de Usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear la Relación Posición-Privilegio de Usuario." });
    }
};