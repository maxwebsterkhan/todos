import { useEffect, useState } from "react";
import "./TodoList.scss";

export interface TodoListProps {
  todo_id: string;
  description: string;
  completed: boolean;
}

interface ToDoContainer extends Array<TodoListProps> {}

const TodoList = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);

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
        return (
          <div key={todo.todo_id}>
            <div onClick={() => completeTodo(todo.todo_id, !todo.completed)}>
              O
            </div>
            <p>{todo.description}</p>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            <div onClick={() => deleteTodo(todo.todo_id)}>X</div>
            <textarea
              value={todo.description}
              onChange={(event) => editTodo(todo.todo_id, event.target.value)}
            />
            <div onClick={() => editTodo(todo.todo_id, todo.description)}>
              update
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
