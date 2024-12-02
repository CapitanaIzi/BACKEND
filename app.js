import express, { json } from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js'; // Importa las rutas de las listas
import cors from 'cors'; // Importa el paquete cors

config();

const app = express();

// Middleware
app.use(cors());  // Usa cors para permitir todas las solicitudes de cualquier origen
app.use(json());

// Rutas
app.use('/api', userRoutes);  // Rutas de usuario
app.use('/api/listas', listRoutes);  // Rutas de listas

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
