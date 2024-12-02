import pool from '../config/database.js';

// Obtener todos los usuarios
export async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registrar usuario
export async function registerUser(req, res) {
  console.log(req.body); // Verifica que req.body contiene los datos esperados
  const { nombre, correo, contrasena } = req.body; // Desestructurando las propiedades
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)', // Corregido correo en lugar de email
      [nombre, correo, contrasena]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    console.error(error); // Imprime el error en consola para depuración
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
    res.status(200).json({ message: 'Inicio de sesión exitoso', nombre: usuario.nombre });
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
    const { name, correo } = req.body;

    const [result] = await pool.query(
      'UPDATE usuarios SET name = ?, correo = ? WHERE id = ?',
      [name, correo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente', id, name, email: correo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un usuario por ID
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}