import { db } from './config.js';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});

export default pool;
