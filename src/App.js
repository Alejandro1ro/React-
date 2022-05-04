import React, {useState, useEffect} from 'react';
import {TaskRows} from './components/TaskRow.js';
import {TaskBanner} from './components/TaskBanner.js';
import {TaskCreator} from './components/TaskCreator.js';
import {VisibilityControl} from './components/VisibilityControl.js';

const defaultValue = [
    {name: 'Task One', done: false},
    {name: 'Task Two', done: false},
    {name: 'Task Three', done: false},
    {name: 'Task Four', done: false},
    {name: 'Task Five', done: false}
];

function App() {
    const [userName, setUserName] = useState('Alejandro');
    const [taskItems, setTaskItems] = useState(defaultValue);
    const [showCompleted, setShowCompleted] = useState(true);

    useEffect(() => {
        let data = localStorage.getItem('tasks');
        if (data != null) {
            setTaskItems(JSON.parse(data));
        } else {
            setUserName('Alejandro Ejemplo');
            setTaskItems([
                {name: 'Task One Ejemplo', done: false},
                {name: 'Task Two Ejemplo', done: false},
                {name: 'Task Three Ejemplo', done: false},
                {name: 'Task Four  Ejemplo', done: false},
                {name: 'Task Five  Ejemplo', done: false}
            ]);
            setShowCompleted(true);
        }
    }, []);


    /**
     * 
     * @param {objet} task
     * @param {string} action ["add", "delete", "update"]
     * Tomar la task y la va a agrear o la va a actualizar si es necesario
     *  
     */
    const allowedActions = ["add", "delete", "update"];
    const updateTask = (task, action = "add") => {
        // if (allowedActions.includes(action))            // boolean
        if(allowedActions.indexOf(action) === -1) return; // number

        let tasks = [...taskItems];
        if (!taskItems.find((t) => t.name === task)) {
            tasks = [...taskItems, {name: task, done: false}];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTaskItems(tasks);
    }

    // TODO: Eliminar la funcion
    const createNewTask = (taskName) => {
        if (!taskItems.find((t) => t.name === taskName)) {
            const tasks = [...taskItems, {name: taskName, done: false}];
            setTaskItems(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    };

    const toggleTask = (task) => setTaskItems(taskItems.map((t) => (t.name === task.name ? {...t, done: !t.done} : t)));

    const taskTableRows = (doneValue) =>
        taskItems
            .filter((task) => task.done === doneValue)
            .map((task) => <TaskRows task={task} key={task.name} toggleTask={toggleTask} />);

    return (
        <div className="App">
            <div className="container">
                <TaskBanner userName={userName} taskItems={taskItems} />
                <TaskCreator callback={createNewTask} />
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Hechas</th>
                        </tr>
                    </thead>
                    <tbody>{taskTableRows(false)}</tbody>
                </table>
                <div className="bg-dark text-white text-center p-2 mb-1">
                    <VisibilityControl
                        description="Tareas Completadas"
                        isChecked={showCompleted}
                        callback={(checked) => setShowCompleted(checked)}
                    />
                </div>
                {showCompleted && (
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Descripcion</th>
                                <th>Hechas</th>
                            </tr>
                        </thead>
                        <tbody>{taskTableRows(true)}</tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default App;
