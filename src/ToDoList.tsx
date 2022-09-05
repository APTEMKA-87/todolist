import React, {ChangeEvent} from 'react';
import {FilterValueTypes} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
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

                        return <li key={t.id}
                                   className={t.isDone === true ? 'is-done' : ''}
                        >
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
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

