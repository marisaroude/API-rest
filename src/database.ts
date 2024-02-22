import { Pool } from 'pg'
import 'dotenv/config';

const port: number = parseInt(process.env.PORT_PG || '', 10);

export const pool = new Pool({
    user: process.env.USER_PG,
    host: process.env.HOST_PG,
    port: port,
    password: process.env.PASSWORD_PG,
    database: process.env.DATABASE_PG
})