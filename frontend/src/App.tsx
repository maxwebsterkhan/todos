import TodoList from "./components/TodoList/TodoList";
import "./App.scss";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";

const App = () => {
  return (
    <div className="App">
      <TodoList />
      <CreateTodo />
    </div>
  );
};

export default App;
