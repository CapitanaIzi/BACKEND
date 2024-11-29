import pool from '../config/database.js';

// Obtener todos los usuarios
export async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un usuario
export async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({
         id: result.insertId,
            message: "creado correctamente"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un usuario por ID
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente', id, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un usuario por ID
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}