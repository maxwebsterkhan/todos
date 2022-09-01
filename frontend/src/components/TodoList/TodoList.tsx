import { useEffect, useState } from "react";
import "./TodoList.scss";

interface TodoListProps {
  todo_id: string;
  description: string;
  completed: boolean;
  values: object;
}
interface ToDoContainer extends Array<TodoListProps> {}

type ValuesObject = {
  [todo_id: TodoListProps["todo_id"]]: TodoListProps["description"];
};

const TodoList = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);
  const [values, setValues] = useState<ValuesObject>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
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
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="TodoList">
      {todos.map((todo) => {
        const { todo_id, description, completed } = todo;
        return (
          <div key={todo_id}>
            <div onClick={() => completeTodo(todo_id, !completed)}>O</div>
            <p>{description}</p>
            <p>{completed ? "Completed" : "Not Completed"}</p>
            <div onClick={() => deleteTodo(todo_id)}>X</div>
            <input
              id={todo_id}
              name={todo_id}
              value={values[todo_id] || ""}
              onChange={handleChange}
            />
            <div onClick={() => editTodo(todo_id, values[todo_id])}>update</div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
