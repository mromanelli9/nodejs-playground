export default {
  client: 'pg',
  connection: {
    port: Number.parseInt(process.env.DB_PORT || '5432', 10),
    host: process.env.DB_HOST as string,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/infrastructure/database/migrations',
  },
  seeds: {
    directory: 'src/infrastructure/database/seeds',
  },
};
