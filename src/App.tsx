import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    let tasks1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'CSS', isDone: false},
    ]

    const removeTask = (id: number) => {
        tasks1 = tasks1.filter(t => t.id != id)
        console.log(tasks1)
    }

    return (
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasks1}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
