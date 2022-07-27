import React from "react";
import {FilterValueTypes} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValueTypes) => void
}

export function ToDoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=>{props.removeTask(t.id)}}>x</button>
                </li>)}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>all</button>
                <button onClick={()=>{props.changeFilter('active')}}>active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>completed</button>
            </div>
        </div>
    )
}