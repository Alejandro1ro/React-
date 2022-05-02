import React, {useState} from 'react';

export const TaskCreator = (props) => {
    const [newTaskName, setNewTaskName] = useState('');
    const updateNewTaskValue = (e) => setNewTaskName(e.target.value);
    const createNewTask = () => {
        props.callback(newTaskName)
        setNewTaskName('');
    };
    return (
        <div className="input-group my-1">
            <input type="text" className="form-control" value={newTaskName} onChange={updateNewTaskValue} />
            <button className="btn btn-dark" onClick={createNewTask}>
                Agregar Tarea
            </button>
        </div>
    );
};
