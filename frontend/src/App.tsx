import TodoList from "./components/TodoList/TodoList";
import "./App.scss";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";
import { Fragment } from "react";
import { Grid, Paper } from "@mui/material";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500,
  } as React.CSSProperties,
};

const App = () => {
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <CreateTodo />
          </Paper>
        </Grid>
        <Grid item xs={12} style={styles.Paper}>
          <TodoList />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
