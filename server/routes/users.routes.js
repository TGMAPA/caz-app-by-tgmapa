import express from 'express';
import { getAllUsers} from '../controllers/users.controller.js';

const router = express.Router();

// Crear usuario
//router.post('/createUser', crearUsuario);

// Get all users
router.get('/getAllUsers', getAllUsers);

// Obtener usuario por ID
//router.get('/:id', obtenerUsuarioPorId);

export default router;