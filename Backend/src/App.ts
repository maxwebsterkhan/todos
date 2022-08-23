import express, { NextFunction, Request, Response } from "express";
const db = require("./Db");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at  http://localhost:${process.env.PORT}`);
});

app.get("/", async (req, res) => {
  const queryResult = await db.query("select * from recipe");
  res.send(queryResult.rows);
});
