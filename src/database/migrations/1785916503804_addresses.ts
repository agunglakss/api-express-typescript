import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("addresses", {
    id: { type: 'uuid', notNull: true, unique: true, primaryKey: true, default: pgm.func('uuidv7()') },
    user_id: { type: 'uuid', notNull: true, references: "users", default: pgm.func('uuidv7()') },
    name: { type: 'varchar(50)', notNull: true },
    country: { type: 'integer', notNull: true },
    city: { type: 'integer', notNull: true },
    postal_code: { type: 'varchar(10)', notNull: true },
    detail_address: { type: 'text', notNull: true },
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
  pgm.dropTable('addresses');
}
