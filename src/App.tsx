import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValueTypes = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueTypes>('all')

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    const changeFilter = (value: FilterValueTypes) => {
        setFilter(value)
    }

    const addTask = (title:string) => {
      let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
      let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks(tasks)
    }

    return (
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
