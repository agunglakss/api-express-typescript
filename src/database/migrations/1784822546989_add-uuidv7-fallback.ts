import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
      CREATE OR REPLACE FUNCTION uuidv7()
      RETURNS uuid AS $$
        SELECT encode(
          set_bit(
            set_bit(
              overlay(uuid_send(gen_random_uuid()) PLACING substring(int8send((extract(epoch from clock_timestamp()) * 1000)::bigint) FROM 3) FROM 1 FOR 6),
              52, 1
            ),
            53, 1
          ),
          'hex'
        )::uuid;
      $$ LANGUAGE sql VOLATILE;
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('DROP FUNCTION IF EXISTS uuidv7();');
}
