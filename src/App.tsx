import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValueTypes = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueTypes
}

function App() {

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const changeFilter = (value: FilterValueTypes, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj(tasksObj)
    }

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id]

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }

                    return <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
