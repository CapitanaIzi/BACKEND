import express from 'express';
import listController from '../controllers/listController.js'; // Importa el controlador de listas

const router = express.Router();

// Crear lista
router.post('/', listController.crearLista);

// Obtener listas de un usuario
router.get('/:idUsuario', listController.obtenerListas);

// Agregar tarea a una lista
router.post('/:idLista/tareas', listController.agregarTarea);

// Marcar tarea como completada
router.patch('/:idLista/tareas/:idTarea', listController.marcarTarea);

export default router;
