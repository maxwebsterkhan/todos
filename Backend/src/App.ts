import { Request, Response, NextFunction } from "express";
const express = require("express");
const app = express();
const newPool = require("./Db");
require("dotenv").config();

app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// get all todos
app.get("/todos", async (req: Request, res: Response) => {
  const queryResult = await newPool.query("select * from todo");
  res.send(queryResult.rows);
});

// create a todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await newPool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

// get a todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await newPool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    if (description) {
      const editTodo = await newPool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
    } else if (completed) {
      const completeTodo = await newPool.query(
        "UPDATE todo SET completed = $1 WHERE todo_id = $2",
        [completed, id]
      );
    }
    res.json("todo was updated");
  } catch (error: any) {
    console.error(error.message);
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await newPool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (error: any) {
    console.error(error.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT || 5000}`);
});
