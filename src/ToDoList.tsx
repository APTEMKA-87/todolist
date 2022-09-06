import React, {ChangeEvent} from 'react';
import {FilterValueTypes} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueTypes, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    filter: FilterValueTypes
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function ToDoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>

            <h3><EditableSpan title={props.title}
                              onChange={changeTodolistTitle}/>

                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <div key={t.id}
                                   className={t.isDone === true ? 'is-done' : ''}
                        >
                            <Checkbox onChange={onChangeStatusHandler}
                                      checked={t.isDone}/>
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>

                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>

                        </div>
                    }
                )}
            </div>

            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>all
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={"primary"}
                    onClick={onActiveClickHandler}>active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}>completed
                </Button>
            </div>
        </div>
    )
}

