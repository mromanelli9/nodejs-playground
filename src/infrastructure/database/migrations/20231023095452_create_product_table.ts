import { Knex } from 'knex';

const tableName = 'product';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('price', 2).notNullable();
    table.integer('stock_quantity').notNullable();
    table
      .integer('category_id')
      .references('id')
      .inTable('category')
      .notNullable()
      .onDelete('set null');
    table.integer('created_by').references('id').inTable('user').notNullable().onDelete('set null');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
