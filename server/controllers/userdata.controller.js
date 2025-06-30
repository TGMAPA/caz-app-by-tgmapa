// User Model
import UserData from "../models/UserDataModel/UserData.js" ;

// Validation tool
import Validation from "../tools/Validation.js";

// ===== Controller Functions

// Function to create a User and error handling
export const createUser = async (req, res) => {
    if(!await Validation.VerifyUserPrivilege( req.session.currentUser, [ 'Admin' ], res )){ 
        return ;
    } // Restrict Users by their position and session existence 
     
    try {
        const data = req.body;
        const status = await UserData.insert(data);
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

// Function to get all the users in db and error handling
export const getAllUsers = async (req, res) => {
    try {
        const [status, users] = await UserData.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    users: users, 
                    message: 'Se obtuvieron los usuarios exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener a los usuario." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener a los usuario." });
    }
};

// Function to get all the users in db and error handling
export const getUserByID = async (req, res) => {
    try {
        const id = req.body.id;
        const [status, user] = await UserData.getByID(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    user: user, 
                    message: 'Se obtuvo el usuario exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener al usuario." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener al usuario." });
    }
};

// Function to update a User and error handling
export const updateUser = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const status = await UserData.update(id2Search, data);
        if(status){ // Operation Succesfull
            res.json(
                {
                    status: status,
                    message: 'Usuario actualizado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al actualizar el usuario." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al actualizar el usuario." });
    }
};

// Function to Logic Delete a User and error handling
export const logicDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await UserData.logicDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Usuario eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el usuario." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el usuario." });
    }
};

// Function to Logic Delete a User and error handling
export const physicalDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await UserData.physicalDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Usuario eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el usuario." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el usuario." });
    }
};