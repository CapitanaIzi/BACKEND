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

// Registrar usuario
export async function registerUser(req, res) {
  const { nombre, correo, contrasena } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
      [nombre, correo, contrasena]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};
// Iniciar sesión
export async function loginUser(req, res) {
  const { correo, contrasena } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    const usuario = rows[0];
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
// Cerrar sesión (opcional)
export async function logoutUser(req, res) {
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
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