import { Grid, Paper } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import "./TodoList.scss";

interface TodoListProps {
  todo_id: string;
  description: string;
  completed: boolean;
  values: object;
  editing: boolean;
}
interface ToDoContainer extends Array<TodoListProps> {}

type ValuesObject = {
  [todo_id: TodoListProps["todo_id"]]: TodoListProps["description"];
};

type EditingObject = {
  [todo_id: TodoListProps["todo_id"]]: TodoListProps["editing"];
};

const styles = {
  Icon: {
    marginLeft: "auto",
  } as React.CSSProperties,
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500,
  } as React.CSSProperties,
};

const TodoList = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);
  const [values, setValues] = useState<ValuesObject>({});
  const [editing, setEditing] = useState<EditingObject>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };

  const handleEditing = (todo_id: string) => {
    setEditing((editing) => {
      return { ...editing, [todo_id]: !editing[todo_id] };
    });
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log("deleted");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const completeTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
      });
      setTodos(
        todos.map((todo) => {
          return todo.todo_id === id ? { ...todo, completed } : todo;
        })
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const editTodo = async (id: string, description: string) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      setTodos(
        todos.map((todo) => {
          return todo.todo_id === id ? { ...todo, description } : todo;
        })
      );
      handleEditing(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      {todos.map((todo) => {
        const { todo_id, description, completed } = todo;
        return (
          <Grid key={todo_id} xs={12} item>
            <Paper elevation={2} style={styles.Paper}>
              <p>{description}</p>
              <p>{completed ? "Completed" : "Not Completed"}</p>
              <div onClick={() => completeTodo(todo_id, !completed)}>O</div>
              <div onClick={() => deleteTodo(todo_id)}>X</div>
              {editing[todo_id] ? (
                <Fragment>
                  <input
                    id={todo_id}
                    name={todo_id}
                    value={values[todo_id] || ""}
                    onChange={handleChange}
                  />

                  <div onClick={() => editTodo(todo_id, values[todo_id])}>
                    update
                  </div>
                </Fragment>
              ) : (
                <div onClick={() => handleEditing(todo_id)}>not editing</div>
              )}
            </Paper>
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default TodoList;
