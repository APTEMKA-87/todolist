import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueTypes} from "./App";

type TaskType = {
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
    filter: FilterValueTypes
    removeTodolist: (todolistId: string) => void
}

export function ToDoList(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

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

    return (
        <div>

            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>

            <ul>
                {props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id}
                                   className={t.isDone === true ? 'is-done' : ''}
                        >
                            <input type="checkbox"
                                   onChange={onChangeInputHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    }
                )}
            </ul>

            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>all
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>completed
                </button>
            </div>

        </div>
    )
}
