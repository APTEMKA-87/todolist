import {TasksStateType} from '../App';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type Action2Type = {
    type: '2',
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t=> t.id != action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "2": {
            return {...state}
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const action2AC = (title: string): Action2Type => {
    return {type: "2", title: title}
}

