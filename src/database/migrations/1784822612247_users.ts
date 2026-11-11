import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {

  pgm.createTable('users', {
    id: { type: 'uuid', notNull: true, unique: true, primaryKey: true, default: pgm.func('uuidv7()') },
    first_name: { type: 'varchar(50)', notNull: true },
    last_name: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    token: { type: 'varchar(255)', notNull: false },
    token_reset_password: { type: 'varchar(255)', notNull: false },
    token_verify: { type: 'boolean', default: true, notNull: true},
    token_expired_at: { type: 'timestamp', notNull: false },
    token_sent_at: { type: 'timestamp', notNull: false },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('users');
}
