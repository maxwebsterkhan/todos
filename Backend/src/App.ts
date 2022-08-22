import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool, Client } from "pg";


const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

const connectDb = async () => {
  try {
      const pool = new Pool({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: 5432
      });

      await pool.connect()
      const res = await pool.query('SELECT * FROM api')
      console.log(res)
      await pool.end()
  } catch (error) {
      console.log(error)
  }
}

connectDb()