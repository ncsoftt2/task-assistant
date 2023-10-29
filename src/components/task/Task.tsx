import {TaskStatus} from "../../api/task-api";
import React, {memo, useCallback} from "react";
import {ChangeEvent, FC} from "react";
import {Box, Checkbox, ListItem} from "@mui/material";
import {EditMenu} from "../Menu/EditMenu";
import {useAppDispatch} from "../../store/hooks";
import {utilsTask} from "../../utils/utilsTask";
import {TaskDomainType, deleteTaskThunk, updateTaskThunk} from "../../store/reducers/tasks/task-reducer";


type PropsType = {
    task: TaskDomainType
    todoId: string
}

export const Task: FC<PropsType> = memo(({todoId, task}) => {
    const dispatch = useAppDispatch()
    const handleDeleteTask = useCallback(() => dispatch(deleteTaskThunk(todoId, task.id)), [todoId, task.id])
    const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskThunk(todoId, task.id, {status}))
    }
    const {style,taskAddedDate} = utilsTask(task)
    return (
        <ListItem sx={style}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <Checkbox
                    sx={{p: 0, mr: '5px', zIndex: 0}}
                    color={'default'}
                    size={'small'}
                    checked={task.status === TaskStatus.Completed}
                    onChange={handleChangeStatus}
                />
                <Box sx={{wordBreak: 'break-all'}}>{task.title}</Box>
            </Box>
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Box>{taskAddedDate}</Box>
                <EditMenu callback={handleDeleteTask} task={task} todoId={todoId}/>
            </Box>
        </ListItem>
    )
})


// export const Task: FC<PropsType> = ({todoId, task}) => {
//     const dispatch = useAppDispatch()
//     const handleDeleteTask = () => dispatch(deleteTaskThunk(todoId, task.id))
//     const taskStatus = task.status === TaskStatus.InProgress
//         ? "In progress"
//         : task.status === TaskStatus.Completed
//             ? 'Completed' : task.status === TaskStatus.Draft ? "Draft" : "New"
//
//
//     let dateString = task.addedDate;
//     let date = new Date(dateString);
//     return (
//         <div style={{margin: '5px 0'}}>
//             <Accordion>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon/>}
//                     aria-controls="panel2a-content"
//                     id="panel2a-header"
//                 >
//                     {/*<Typography>{taskStatus}</Typography>*/}
//                     <Typography>{task.title}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                         <Box>{task.deadline === null ? taskDate : `${taskDate}/${task.deadline}`}</Box>
//                         <EditMenu callback={handleDeleteTask}>
//                             <EditableTask task={task} todoId={todoId}/>
//                         </EditMenu>
//                     </Box>
//                 </AccordionDetails>
//             </Accordion>
//         </div>
//     )
// }