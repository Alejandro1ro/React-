import React from "react";

export const TaskBanner =  props => (
    <h4 className="bg-dark p-3 text-light">
        {props.userName} te faltan ({props.taskItems.filter(t => !t.done).length} tareas para hacer)
    </h4>
)