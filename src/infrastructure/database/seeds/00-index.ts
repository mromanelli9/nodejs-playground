import { Knex } from 'knex';
import usersData from './users-data.json';
import categoriesData from './categories-data.json';
import productsData from './products-data.json';

type DataMapping = {
  table: string;
  data: object;
};

const dataWrapper: DataMapping[] = [
  {
    table: 'user',
    data: usersData,
  },
  {
    table: 'category',
    data: categoriesData,
  },
  {
    table: 'product',
    data: productsData,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex: Knex): Promise<void> => {
  dataWrapper.forEach(async (el) => {
    // Deletes ALL existing entries
    const { table, data } = el;
    await knex(table).del();

    // Inserts seed entries
    await knex(table).insert(data);
  });
};
