import { AppBar, Container, Toolbar, Typography, Stack, TextField, Button } from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { savetodos } from "./utils/features";

const App = () => {

  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const [title, setTitle] = useState<TodoItemType["title"]>("");


  const completeHandler = (id: TodoItemType["id"]) => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    })

    setTodos(newTodos);

  }

  const deleteHandler = (id: TodoItemType["id"]) => {

    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);

    setTodos(newTodos);

  }

  const editHandler = (id: TodoItemType["id"], newTitle: TodoItemType["title"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    })

    setTodos(newTodos);

  }

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 100)
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");

  };

  useEffect(() => {
    savetodos(todos)
  }, [todos])

  return (
    <Container sx={{ height: "95vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack style={{ overflowY: "auto" }} height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem key={i.id} todo={i} completeHandler={completeHandler} deleteHandler={deleteHandler} editHandler={editHandler} />
        ))}
      </Stack>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} variant="filled" fullWidth label={"New Task"} onKeyDown={(e) => {
        if (e.key === "Enter" && title !== "") submitHandler();
      }} />
      <Button
       fullWidth
       sx={{margin: "1rem 0"}}
       variant="contained" 
       onClick={submitHandler}
        disabled={title == ''}>ADD</Button>
    </Container>
  )
}

export default App
