import { Pool } from 'pg';

const pool = new Pool({
    
    host: "localhost", //process.env.DB_HOST,
    port: Number(5432),//process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;
