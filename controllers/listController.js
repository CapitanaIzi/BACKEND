import pool from '../config/database.js';  // Importa la conexión a la base de datos

// Crear una nueva lista
const crearLista = async (req, res) => {
  try {
    const { titulo, tipo, idUsuario } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO listas (titulo, tipo, idUsuario) VALUES (?, ?, ?)',
      [titulo, tipo, idUsuario]
    );

    res.status(201).json({ idLista: result.insertId, titulo, tipo, idUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la lista' });
  }
};

// Obtener todas las listas de un usuario
const obtenerListas = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    const [listas] = await pool.execute('SELECT * FROM listas WHERE idUsuario = ?', [idUsuario]);
    res.status(200).json(listas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las listas' });
  }
};

// Agregar una tarea a una lista
const agregarTarea = async (req, res) => {
  try {
    const { idLista } = req.params;
    const { contenido } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO tareas (contenido, idLista) VALUES (?, ?)',
      [contenido, idLista]
    );

    res.status(201).json({ idTarea: result.insertId, contenido, estado: false, idLista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la tarea' });
  }
};

// Marcar una tarea como completada
const marcarTarea = async (req, res) => {
  try {
    const { idLista, idTarea } = req.params;

    const [result] = await pool.execute(
      'UPDATE tareas SET estado = NOT estado WHERE id = ? AND idLista = ?',
      [idTarea, idLista]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Estado de la tarea actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al marcar la tarea' });
  }
};
export default {
  crearLista,
  obtenerListas,
  agregarTarea,
  marcarTarea
}