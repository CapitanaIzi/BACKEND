import express from 'express';
import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateEmails } from '../middlewares/validateEmail.js';

const router = express.Router();

router.get('/user', getAllUsers);        // Obtener todos los usuarios
router.post('/user/register', validateEmails,registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);
router.put('/user/:id',validateEmails, updateUser);      // Actualizar un usuario por ID
router.delete('/user/:id', deleteUser);  // Eliminar un usuario por ID

export default router;