const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  atabase: process.env.PGDATABASE,
  password: "",
  port: Number(process.env.PGPORT),
});

module.exports = {
  query: (text: any, params: any, callback: any) =>
    pool.query(text, params, callback),
};
