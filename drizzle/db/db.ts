import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { schema } from './schema';

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
})

export const db = drizzle(pool, {schema, mode: 'default'})