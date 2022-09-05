import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropstype = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropstype) {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    return <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}