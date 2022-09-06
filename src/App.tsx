import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button, Container, Grid,
    IconButton, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export type FilterValueTypes = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueTypes
}

type TaskStateType = {
    [key: string]: Array<TaskType>
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

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj(tasksObj)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
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

    function addTodolist(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodoList = tasksObj[tl.id]

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
