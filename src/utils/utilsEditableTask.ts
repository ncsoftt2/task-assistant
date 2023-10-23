import {RequestStatusType} from "../store/reducers/app/app-reducer";

export const utilsEditableTask = (taskUpdateStatus:RequestStatusType) => {
    const styleTask = {
        color:'white',
        padding:'10px',
        borderRadius:'20px',
        backgroundColor:`${taskUpdateStatus === 'succeeded' ? "green" : "red"}`,
        textAlign:'center',
        margin:'10px 0'
    }
    return {styleTask}
}