// User Model
import UserPrivilegesEndpoints from '../models/UserPrivilegesEndpoints/UserPrivilegesEndpoints.js';


// ===== Controller Functions

// Function to relate User Positions and User Privilege and error handling
export const relatePrivilegesAndEndpoint = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await UserPrivilegesEndpoints.getBy({ privilegeID: data.privilegeID, endpoint: data.endpoint });
        
        if( status ){ // Operation Successfull
            // Search possible duplicated values
            let duplicatedValue = false; // Flag to show duplicated values existence
            if( result.length > 0 ){ // Possible duplicated values
                // Search in possible coincidences (Not Logicaly Deleted)
                for (let i = 0; i < result.length; i++) {
                    if( result[i].LogDelete != "NULL" && result[i].endpoint === data.endpoint && result[i].privilegeID === data.privilegeID){
                        // Duplicated Value (Condition: name)
                        duplicatedValue = true;
                    }
                }
            }

            // Validate duplicate Existence
            if(!duplicatedValue){
                // No Duplicate Existence

                // --------- Create new user Position ---------
                const status = await UserPrivilegesEndpoints.insert(data);
                if(status){ // If status = true: Insertion Successfull
                    res.json(
                        { 
                            status: status, 
                            message: 'Relación Privilegio-Endpoint de Usuario creada exitosamente.'
                        }
                    );
                }else{ // Insertion Not Successfull
                    res.status(500).json({ error: "Hubo un problema al crear la Relación Privilegio-Endpoint de Usuario." });
                }      

            }else{
                // Duplicate Existence!!
                res.status(500).json({ error: "La Relación Privilegio-Endpoint de Usuario ya existe en la base de datos." });
            }
        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al crear la Relación Privilegio-Endpoint de Usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear la Relación Privilegio-Endpoint de Usuario." });
    }
};

// Function to delete a User Positions and User Privilege relation and error handling
export const deleteRelationPrivilegeAndEndpoint = async (req, res) => {
    try {
        // Input Data
        const data = req.body;

        // Verify username duplicates
        const [status, result] = await UserPrivilegesEndpoints.getBy({ privilegeID: data.privilegeID, endpoint: data.endpoint });
        
        if( status ){ // Operation Successfull
            // Search possible duplicated values

            if( result.length === 0 ){ // No value
                res.status(500).json({ error: "La Relación Privilegio-Endpoint de Usuario no existe en la base de datos." });
                return;
            }
            
            // --------- Delete Relation ---------
            const status = await UserPrivilegesEndpoints.physicalDelete(result[0].id);
            if(status){ // If status = true: Elimination Successfull
                res.json(
                    { 
                        status: status, 
                        message: 'Relación Privilegio-Endpoint de Usuario eliminada exitosamente.'
                    }
                );
            }else{ // Insertion Not Successfull
                res.status(500).json({ error: "Hubo un problema al eliminar la Relación Privilegio-Endpoint de Usuario." });
            }      

        }else{
           // Operation Not Successfull 
           res.status(500).json({ error: "Hubo un problema al eliminar la Relación Privilegio-Endpoint de Usuario." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al eliminar la Relación Privilegio-Endpoint de Usuario." });
    }
}