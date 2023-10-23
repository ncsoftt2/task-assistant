import {TaskType} from "../../api/task-api";
import {FC} from "react";

type PropsType = {
    task:TaskType
    todoId:string
}
export const TaskInfo:FC<PropsType> = ({todoId,task}) => {
    return (
        <div>task info</div>
    )
}