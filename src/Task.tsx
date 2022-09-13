import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./ToDoList";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }

    return <div key={props.task.id}
                className={props.task.isDone === true ? 'is-done' : ''}
    >
        <Checkbox onChange={onChangeStatusHandler}
                  checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>

    </div>
}