import fs from 'fs';
import { Pool } from 'pg'

if (fs.existsSync('.env')) {
  process.loadEnvFile('.env');
}

export const db = new Pool({
  host: process.env["DB_HOST"] || "127.0.0.1",
  port: Number(process.env["DB_PORT"])||5432,
  user: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  ssl: Boolean(process.env["DB_SSLMODE"]),
  max: Number(process.env["DB_MAX_OPEN_CONN"] || 20),
  min: Number(process.env["DB_MAX_IDLE_CONN"] || 5),
  maxLifetimeSeconds: Number(process.env["DB_CONN_MAX_LIFTETIME_SEC"]) || 300,
});

export const dbConnection = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('FATAL: Could not connect to database!', error);
    await db.end();
    process.exit(1);
  }
}
