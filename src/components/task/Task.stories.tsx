import React from "react";
import {Task} from "./Task";
import {MainStoreDecorators} from "../../stories/MainStoreDecorators";

export default {
    title: "Single task",
    component: Task,
    decorators: [MainStoreDecorators]
}

export const TaskExample = () => {
    return (
        <>
            <Task
                todoId={'1'}
                tasks={{id:'1',title:'Milk',isDone:false}}
            />
            <Task
                todoId={'2'}
                tasks={{id:'2',title:'Shake',isDone:true}}
            />
        </>
    )
}