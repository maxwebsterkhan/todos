import React, { useState } from "react";

export interface CreateTodoProps {
  description?: string;
}

export function CreateTodo(props: CreateTodoProps) {
  const [description, setDescription] = useState("");

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description };

      await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // window.location.href = "/";
      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    setDescription(enteredValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={description} onChange={inputHandler} />
      <button>Add</button>
    </form>
  );
}
