import { Pool } from 'pg';

console.log(process.env.DATABASE_URL);

const pool = new Pool({
    //connectionString: process.env.DATABASE_URL,
    host: "db", //process.env.DB_HOST,
    port: Number(5432),//process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;
