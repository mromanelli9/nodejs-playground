import { Knex } from 'knex';

const tableName = 'user';
const roles = ['admin', 'editor', 'viewer'];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.enu('role', roles, { useNative: true, enumName: 'role_type' }).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
