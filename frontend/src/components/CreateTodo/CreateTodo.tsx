import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

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
    <form style={{ display: "flex" }} onSubmit={onSubmit}>
      <Input
        placeholder="Add a todo"
        inputProps={{
          "aria-label": "description",
        }}
        style={{ width: "90%" }}
        value={description}
        onChange={inputHandler}
      />

      <Button
        type="submit"
        variant="text"
        color="primary"
        style={{ width: "10%", marginLeft: "2%" }}
      >
        <AddTaskSharpIcon />
      </Button>
    </form>
  );
}
