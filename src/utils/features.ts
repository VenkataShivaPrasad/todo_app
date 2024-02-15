export const savetodos=(todos:TodoItemType[]):void=>{
    localStorage.setItem("mytodos",JSON.stringify(todos))
}