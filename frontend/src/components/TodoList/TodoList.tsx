import { useEffect, useState } from "react";
import "./TodoList.scss";

export interface todoListProps {
  todo_id: string;
  description: string;
  completed: boolean;
}

interface ToDoContainer extends Array<todoListProps> {}

const TodoList = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);
  console.log(todos);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
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
            <p>{todo.description}</p>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
