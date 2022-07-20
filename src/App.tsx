import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    const task1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
    ]

    const task2 = [
        {id: 1, title: 'Hello', isDone: true},
        {id: 2, title: 'I am happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false},
    ]

    return (
        <div className="App">
            <ToDoList title='What to learn' tasks={task1}/>
            <ToDoList title='Songs' tasks={task2}/>
        </div>
    );
}

export default App;
