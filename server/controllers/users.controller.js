// User Model
import User from "../models/UserModel/User.js" ;


// ===== Controller Functions

// Function to create a User and error handling
export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const id = await User.insert(data);
        res.json(
            { 
                id, 
                mensaje: 'Usuario creado exitosamente'
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all the users in db and error handling
export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await User.getAll();
        res.json(
            { 
                usuarios, 
                mensaje: 'Se obtuvieron los usuarios exitosamente.' 
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update a User and error handling
export const updateUser = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const result = await User.update(id2Search, data);
        res.json(
            { 
                mensaje: 'Usuario actualizado exitosamente'
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};