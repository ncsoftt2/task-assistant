export type FilterType = "all" | "active" | "completed"

export type TodoType = {
    id:string
    title:string
    filter: FilterType
}

export type TodoListType = {
    todoList: TodoType[]
}