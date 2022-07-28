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
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    const changeFilter = (value: FilterValueTypes) => {
        setFilter(value)
    }

    const addTask = () => {
      let task = {id: v1(), title: 'New Task', isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
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
