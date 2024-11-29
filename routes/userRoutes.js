import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateEmails } from '../middlewares/validateEmail.js';

const router = express.Router();

router.get('/user', getAllUsers);        // Obtener todos los usuarios
router.post('/user', validateEmails, createUser);        // Crear un usuario
router.put('/user/:id',validateEmails, updateUser);      // Actualizar un usuario por ID
router.delete('/user/:id', deleteUser);  // Eliminar un usuario por ID

export default router;