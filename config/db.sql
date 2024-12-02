CREATE DATABASE app_iziel;
USE app_iziel;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM usuarios;

CREATE TABLE listas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tipo ENUM('personal', 'semanal', 'mensual') NOT NULL,
  idUsuario INT NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);
SELECT * FROM listas;

-- Tabla de Tareas
CREATE TABLE tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contenido VARCHAR(255) NOT NULL,
  estado BOOLEAN DEFAULT FALSE,
  idLista INT,
  FOREIGN KEY (idLista) REFERENCES listas(id)
);
SELECT * FROM tareas;
