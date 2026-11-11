import fs from 'fs';
import { Client } from "pg";

async function dbSetup() {
  if (fs.existsSync('.env')) {
    process.loadEnvFile('.env');
  }
  const dbName = process.env['DB_NAME'];
  const client = new Client({
    host: process.env['DB_HOST'] || '127.0.0.1',
    port: Number(process.env['DB_PORT']) || 5432,
    user: process.env['DB_USER'],
    password: "",
    database: "postgres"
  })

  try {
    await client.connect();
    const checkQuery = `SELECT 1 FROM pg_database WHERE datname = $1`;
    const res = await client.query(checkQuery, [dbName]);
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist.`);

      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

dbSetup();
