/* eslint-disable import/first */
import { config } from 'dotenv';

config({ path: '.env' });

import dbConfig from './src/config/database';

export default dbConfig;
