import React, {ChangeEvent, useCallback} from 'react';
import {FilterValueTypes} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


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

export const ToDoList = React.memo((props: PropsType) => {
    console.log('ToDoList')
    const onAllClickHandler =useCallback (() => {
        props.changeFilter('all', props.id)
    },[props.changeFilter, props.id])
    const onActiveClickHandler =useCallback (() => {
        props.changeFilter('active', props.id)
    },[props.changeFilter, props.id])
    const onCompletedClickHandler =useCallback (() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle =useCallback ((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[ props.changeTodolistTitle, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
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
})

