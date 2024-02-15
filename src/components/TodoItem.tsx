import { Delete, Done, Edit } from "@mui/icons-material"
import { Checkbox, Paper, Typography, Button, Stack, TextField } from "@mui/material"
import { useState } from "react";

type PropsType = {
    todo: TodoItemType;
    deleteHandler: (id: TodoItemType["id"]) => void;
    completeHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
}

const TodoItem = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {

    const [editActive, setEditActive] = useState<boolean>(false)
    const [textVal, SettextValue] = useState<string>(todo.title);

    return <Paper sx={{padding: "0.8rem"}}>
        <Stack direction={"row"} alignItems={"center"}>
            {
                editActive ?
                    <TextField
                        value={textVal}
                        onChange={(e) => SettextValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && textVal !== "") {
                                editHandler(todo.id, textVal);
                                setEditActive(false)
                            }
                        }}
                    /> :
                    <Typography marginRight={"auto"} >{todo.title}</Typography>
            }
            <div style={{ marginLeft: "auto" }}>

                <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)} />
                <Button sx={{ opacity: "0.5", color: "black" }} onClick={() => deleteHandler(todo.id)}><Delete /></Button>
                <Button onClick={() => { setEditActive(prev => !prev), editHandler(todo.id, textVal) }}>
                    {
                        editActive ? <Done /> : <Edit />
                    }
                </Button>
            </div>
        </Stack>

    </Paper>
}

export default TodoItem
