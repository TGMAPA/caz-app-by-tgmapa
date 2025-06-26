// User Model
import User from "../models/UserModel/User.js" ;


// ===== Controller Functions

// Function to create a User
export const createUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
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

// Function to get all the users in db
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