import pg from "pg";
import { config } from "../config/config.js";

const conn_pgSql = new pg.Pool({
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword,
});

/* ESTA FORMA POR EL MOMENTO E VISTO Q ES PARA PRODUCCION */
const production_conn_pgSql = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized:false }
})


export default conn_pgSql;