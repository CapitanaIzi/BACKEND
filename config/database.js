import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const PUERTO_MYSQL = 3306;

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(process.env.DB_PORT?"true":"false");


export default pool;