import {TaskPriority, TaskStatus, TaskType} from "api/task-api";

export const utilsTask = (task:TaskType) => {
    const taskPriorityColor = task.priority === TaskPriority.High
        ? "#fc7272"
        : task.priority === TaskPriority.Middle
            ? "#ffc507"
            : task.priority === TaskPriority.Urgently
                ? "#CC0000"
                : task.priority === TaskPriority.Later
                    ? "#72fcfc"
                    : "#72aefc"
    const taskStatusColor = task.status === TaskStatus.Completed
        ? "#afff91"
        : task.status === TaskStatus.InProgress
            ? "#f7ff91"
            : task.status === TaskStatus.Draft
                ? "#d3d3d3"
                : "#9de4ff"
    const style = {
        padding: '5px',
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderColor: `${taskPriorityColor}`,
        borderWidth: '0 5px',
        borderStyle: 'solid',
        backgroundColor: `${taskStatusColor}`
    }
    const date = new Date(task.addedDate)
    const taskDate = date.getDate().toString().padStart(2, '0')
    const taskMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const taskYear = date.getFullYear()
    const taskAddedDate = `${taskDate}.${taskMonth}.${taskYear}`
    return {style,taskAddedDate}
}
