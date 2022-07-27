import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type FilterValueTypes = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'CSS', isDone: false},
    ])

    const removeTask = (id: number) => {
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

    return (
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
