import {TaskPriority, TaskStatus} from "common/enums";

export const utilsTaskStyles = (status:TaskStatus, priority: TaskPriority) => {
    const listItemBorderColor = status === TaskStatus.Completed
        ? "#86ff7b"
        : status === TaskStatus.InProgress
            ? "#fff487"
            : status === TaskStatus.Draft
                ? "#e1e1e1" : '#63cfff'
    const taskPriorityTriangleColor = priority === TaskPriority.High
        ? "#ffd630"
        : priority === TaskPriority.Middle
            ? "#ffa805"
            : priority === TaskPriority.Urgently
                ? "#fd2a2a"
                : priority === TaskPriority.Later
                    ? "#b0b0b0"
                    : "#303aff"
    const listItemStyle = {
        position:'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        background: listItemBorderColor,
        padding:'8px',
        margin: '5px 0',
    }
    const menuItemStyle = {
        fontSize:'14px', '&:hover': {
            backgroundColor: '#e0e0e0',
            transition: 'background-color 0.3s ease'
        }}
    return {
        listItemBorderColor,
        listItemStyle,
        menuItemStyle,
        taskPriorityTriangleColor
    }
}