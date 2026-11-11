import fs from 'fs';
import { runner } from "node-pg-migrate/runner";
import * as path from "path";

async function dbMigrate() {
  if (fs.existsSync('.env')) {
    process.loadEnvFile('.env');
  }
  const direction = process.argv[2] === 'up' ? 'up' : 'down';
  const migrationsDir = path.join(process.cwd(), 'src/database/migrations');
  const dbUrl = `postgres://${process.env['DB_USER']}@${process.env['DB_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}`;
  try {
    await runner({
      databaseUrl: dbUrl,
      direction: direction,
      dir: migrationsDir,
      migrationsTable: 'pgmigrations',
    })

    console.log('Migrations successfully')
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

dbMigrate();
