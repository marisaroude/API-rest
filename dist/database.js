"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
require("dotenv/config");
const port = parseInt(process.env.PORT_PG || '', 10);
exports.pool = new pg_1.Pool({
    user: process.env.USER_PG,
    host: process.env.HOST_PG,
    port: port,
    password: process.env.PASSWORD_PG,
    database: process.env.DATABASE_PG
});
