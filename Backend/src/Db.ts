const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "",
  port: Number(process.env.PGPORT),
});

module.exports = {
  query: (text: any, params: any, callback: any) =>
    pool.query(text, params, callback),
};
