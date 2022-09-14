import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task,
}

const removeTask = action('Task removed')
const changeTaskStatus = action('Task Status changed')
const changeTaskTitle = action('Task Title changed')

export const TaskBaseExample = () => {
    return <>
        <Task
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            task={{id: "1", isDone: true, title: "CSS"}}
            todolistId={"todolistId1"}
        />
        <Task
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            task={{id: "2", isDone: false, title: "JS"}}
            todolistId={"todolistId2"}
        />
    </>
}