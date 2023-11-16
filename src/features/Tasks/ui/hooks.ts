import {TaskPriority, TaskStatus} from "api/task-api";
import {makeStyles, Theme} from "mui-styles";
import React, {ChangeEvent, useCallback, useMemo} from "react";
import {useFormik} from "formik";
import * as yup from 'yup';
import {useActions, useAppDispatch} from "app/store";
import {taskActions} from "features/Tasks/index";
import {TaskDomainType} from "features/Tasks/service/slice/task-reducer";
import {updateTaskTC} from "features/Tasks/service/thunk/updateTask";

export const useTaskService = (todoId:string,id: string,setOpenEditTask?: (value: boolean) => void) => {
    const {updateTaskTC,deleteTaskTC} = useActions(taskActions)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    },[])
    const handleDeleteTask = useCallback(() => {
        deleteTaskTC({todoId, taskId: id})
        setAnchorEl(null)
    },[todoId,id])
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleOpenEditModalTask = useCallback(() => {
        setOpenEditTask && setOpenEditTask(true)
        setAnchorEl(null)
    },[])
    const handleChangeTaskStatus = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const checkedValue = e.currentTarget.checked
        const status = checkedValue ? TaskStatus.Completed : TaskStatus.New
        updateTaskTC({todoId,taskId:id,model: {status}})
    },[todoId,id])
    const taskStatus = useMemo(() => {
        return [
            {label: 'New', status: TaskStatus.New},
            {label: 'In progress', status: TaskStatus.InProgress},
            {label: 'Completed', status: TaskStatus.Completed},
            {label: 'Draft', status: TaskStatus.Draft},
        ]
    },[])
    const taskPriority = useMemo(() => {
        return [
            {label: 'Low', priority: TaskPriority.Low},
            {label: 'Middle', priority: TaskPriority.Middle},
            {label: 'High', priority: TaskPriority.High},
            {label: 'Urgently', priority: TaskPriority.Urgently},
            {label: 'Later', priority: TaskPriority.Later}
        ]
    },[])
    return {
        taskStatus,
        taskPriority,
        handleClose,
        open,
        handleClick,
        handleOpenEditModalTask,
        anchorEl,
        handleChangeTaskStatus,
        handleDeleteTask
    }
}

export const useTaskUtilsStyle = (status:TaskStatus,priority: TaskPriority) => {
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

export const useTaskStyles = makeStyles<Theme>(() => ({
    customList: {
        '& .MuiList-root': {
            padding:0
        },
    },
    taskCheckBox: {
        padding: 0,
        zIndex: 0
    },
    taskTitle: {
        margin:"0 10px",
        fontSize:'16px',
        wordBreak:'break-all',
        width:'100%',
        maxWidth:' 250px'
    }
}))


export const useEditableTask = (task:TaskDomainType) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            title: task.title,
            description: task.description === null ? "" : task.description,
            status: task.status,
            priority: task.priority
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateTaskTC({taskId:task.id,todoId:task.todoListId,model: values}))
        }
    })
    return {formik}
}

const validationSchema = yup.object({
    title: yup.string().min(3,'Минимум 3 символа').max(15,'Максимум 15 символов'),
    description: yup.string().max(80,'Максимум 80 символов')
});